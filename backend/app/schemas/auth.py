from pydantic import BaseModel, EmailStr
from typing import Optional
from app.models.user import UserType

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    fullName: str
    phone: Optional[str] = None
    role: UserType = UserType.patient

class UserResponse(BaseModel):
    id: int
    email: str
    fullName: str
    phone: Optional[str] = None
    role: str
    isActive: bool
    createdAt: str
    updatedAt: str
    
    class Config:
        from_attributes = True