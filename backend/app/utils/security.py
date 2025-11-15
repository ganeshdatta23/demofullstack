"""
Secure token management utilities for httpOnly cookies
"""

from fastapi import Response, Request, HTTPException, status
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from app.config import settings


class SecureTokenManager:
    """Manages JWT tokens with httpOnly cookies for enhanced security"""
    
    @staticmethod
    def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
        """Create JWT access token"""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire, "type": "access"})
        return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    @staticmethod
    def create_refresh_token(data: dict) -> str:
        """Create JWT refresh token"""
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        to_encode.update({"exp": expire, "type": "refresh"})
        return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    @staticmethod
    def verify_token(token: str, token_type: str = "access") -> dict:
        """Verify and decode JWT token"""
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            if payload.get("type") != token_type:
                raise JWTError("Invalid token type")
            return payload
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    @staticmethod
    def set_auth_cookies(response: Response, access_token: str, refresh_token: str):
        """Set secure httpOnly cookies for authentication"""
        # Access token cookie
        response.set_cookie(
            key="access_token",
            value=access_token,
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            httponly=True,
            secure=settings.ENVIRONMENT == "production",
            samesite="lax" if settings.ENVIRONMENT == "development" else "strict"
        )
        
        # Refresh token cookie
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
            httponly=True,
            secure=settings.ENVIRONMENT == "production",
            samesite="lax" if settings.ENVIRONMENT == "development" else "strict"
        )
    
    @staticmethod
    def clear_auth_cookies(response: Response):
        """Clear authentication cookies"""
        response.delete_cookie(
            key="access_token",
            httponly=True,
            secure=settings.ENVIRONMENT == "production",
            samesite="lax" if settings.ENVIRONMENT == "development" else "strict"
        )
        response.delete_cookie(
            key="refresh_token",
            httponly=True,
            secure=settings.ENVIRONMENT == "production",
            samesite="lax" if settings.ENVIRONMENT == "development" else "strict"
        )
    
    @staticmethod
    def get_token_from_cookie(request: Request, token_type: str = "access_token") -> str:
        """Extract token from httpOnly cookie"""
        token = request.cookies.get(token_type)
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return token


# Create singleton instance
token_manager = SecureTokenManager()