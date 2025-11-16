from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.services import AuthService
from app.schemas import LoginRequest, RegisterRequest, UserResponse
from app.auth import create_access_token, get_current_user

router = APIRouter()

@router.post("/login")
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    service = AuthService(db)
    user = service.authenticate_user(credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user.id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "email": user.email,
            "fullName": user.full_name,
            "role": user.user_type.value,
            "isActive": user.is_active
        }
    }

@router.post("/register", response_model=UserResponse)
def register(user_data: RegisterRequest, db: Session = Depends(get_db)):
    service = AuthService(db)
    
    # Check if user already exists
    existing_user = service.get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    user = service.create_user(user_data)
    
    return {
        "id": user.id,
        "email": user.email,
        "fullName": user.full_name,
        "phone": user.phone,
        "role": user.user_type.value,
        "isActive": user.is_active,
        "createdAt": user.created_at.isoformat(),
        "updatedAt": user.updated_at.isoformat()
    }

@router.get("/me")
def get_me(current_user = Depends(get_current_user)):
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "fullName": current_user.full_name,
        "role": current_user.user_type.value,
        "isActive": current_user.is_active
    }

@router.post("/logout")
def logout():
    return {"message": "Logout successful"}

@router.post("/refresh")
def refresh_token():
    return {"message": "Token refreshed successfully"}