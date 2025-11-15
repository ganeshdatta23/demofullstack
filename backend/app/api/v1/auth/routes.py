"""
Authentication routes
"""

from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.api.v1.auth.schemas import UserCreate, UserResponse
from app.api.v1.auth.service import AuthService
from app.utils.security import token_manager

router = APIRouter()


@router.post("/logout")
async def logout(response: Response):
    """Logout user by clearing httpOnly cookies"""
    token_manager.clear_auth_cookies(response)
    return {"message": "Logout successful"}


@router.post("/register", response_model=UserResponse)
async def register(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user"""
    try:
        auth_service = AuthService(db)
        return await auth_service.create_user(user_data)
    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user data provided"
        )
    except Exception as e:
        import logging
        logging.getLogger(__name__).error(f"Registration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration service temporarily unavailable"
        )


@router.post("/login")
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    """Login user and set secure httpOnly cookies"""
    try:
        auth_service = AuthService(db)
        auth_data = await auth_service.authenticate_user(form_data.username, form_data.password)
        
        # Set secure httpOnly cookies
        token_manager.set_auth_cookies(
            response, 
            auth_data["access_token"], 
            auth_data["refresh_token"]
        )
        
        return {
            "message": "Login successful",
            "user": auth_data["user"]
        }
    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        import logging
        logging.getLogger(__name__).error(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Authentication service temporarily unavailable"
        )


@router.post("/refresh")
async def refresh_token(
    request: Request,
    response: Response
):
    """Refresh access token using httpOnly cookie"""
    try:
        # Get refresh token from cookie
        refresh_token = token_manager.get_token_from_cookie(request, "refresh_token")
        
        # Verify refresh token
        payload = token_manager.verify_token(refresh_token, "refresh")
        user_id = payload.get("sub")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        # Create new tokens
        new_access_token = token_manager.create_access_token(data={"sub": user_id})
        new_refresh_token = token_manager.create_refresh_token(data={"sub": user_id})
        
        # Set new cookies
        token_manager.set_auth_cookies(response, new_access_token, new_refresh_token)
        
        return {"message": "Token refreshed successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        import logging
        logging.getLogger(__name__).error(f"Token refresh error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token refresh failed"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    request: Request
):
    """Get current user information"""
    return await AuthService.get_current_user(request)