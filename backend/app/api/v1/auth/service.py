"""
Authentication service with business logic
"""

from fastapi import HTTPException, status, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from passlib.context import CryptContext
from datetime import datetime, timezone
from typing import TYPE_CHECKING
from app.models.user import User
from app.api.v1.auth.schemas import UserCreate
from app.utils.security import token_manager
from app.config import settings

if TYPE_CHECKING:
    from app.database import get_db, AsyncSessionLocal
else:
    from app.database import AsyncSessionLocal

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Token management now handled by SecureTokenManager


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    def hash_password(self, password: str) -> str:
        """Hash a password"""
        return pwd_context.hash(password)
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a password"""
        return pwd_context.verify(plain_password, hashed_password)
    
    # Token creation now handled by SecureTokenManager
    
    async def get_user_by_email(self, email: str) -> User:
        """Get user by email"""
        result = await self.db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()
    
    async def create_user(self, user_data: UserCreate) -> User:
        """Create a new user"""
        # Check if user already exists
        existing_user = await self.get_user_by_email(user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = self.hash_password(user_data.password)
        db_user = User(
            email=user_data.email,
            phone=user_data.phone,
            password_hash=hashed_password,
            full_name=user_data.full_name,
            user_type=user_data.user_type
        )
        
        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)
        
        return db_user
    
    async def authenticate_user(self, email: str, password: str) -> dict:
        """Authenticate user and return tokens"""
        user = await self.get_user_by_email(email)
        if not user or not self.verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user"
            )
        
        # Create tokens using secure token manager
        access_token = token_manager.create_access_token(data={"sub": str(user.id)})
        refresh_token = token_manager.create_refresh_token(data={"sub": str(user.id)})
        
        # Update last login
        user.last_login_at = datetime.now(timezone.utc)
        try:
            await self.db.commit()
            await self.db.refresh(user)
        except Exception as e:
            await self.db.rollback()
            # Log error type only, not details for security
            import logging
            logging.getLogger(__name__).error(f"Database error during login update: {type(e).__name__}")
            # Continue without failing login - tokens already created
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "user": user
        }
    
    @staticmethod
    async def get_current_user(request: Request) -> User:
        """Get current user from httpOnly cookie"""
        try:
            # Get token from httpOnly cookie
            token = token_manager.get_token_from_cookie(request, "access_token")
            
            # Verify token
            payload = token_manager.verify_token(token, "access")
            user_id = payload.get("sub")
            
            if not user_id:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token payload"
                )
            
            # Get user from database
            async with AsyncSessionLocal() as db:
                result = await db.execute(select(User).where(User.id == int(user_id)))
                user = result.scalar_one_or_none()
                
                if not user or not user.is_active:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="User not found or inactive"
                    )
                
                return user
                
        except HTTPException:
            raise
        except Exception as e:
            import logging
            logging.getLogger(__name__).error(f"Auth error: {e}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication failed"
            )