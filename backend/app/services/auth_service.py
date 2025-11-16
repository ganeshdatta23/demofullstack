from sqlalchemy.orm import Session
from app.models import User, Patient
from app.schemas.auth import RegisterRequest, LoginRequest
from typing import Optional
import hashlib

class AuthService:
    def __init__(self, db: Session):
        self.db = db
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.get_password_hash(plain_password) == hashed_password
    
    def get_password_hash(self, password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()
    
    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        user = self.get_user_by_email(email)
        if not user or not self.verify_password(password, user.password_hash):
            return None
        return user
    
    def create_user(self, user_data: RegisterRequest) -> User:
        hashed_password = self.get_password_hash(user_data.password)
        
        user = User(
            email=user_data.email,
            password_hash=hashed_password,
            full_name=user_data.fullName,
            phone=user_data.phone,
            user_type=user_data.role,
            is_active=True
        )
        
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        
        # Create patient profile if user is patient
        if user_data.role == "patient":
            patient = Patient(user_id=user.id)
            self.db.add(patient)
            self.db.commit()
        
        return user