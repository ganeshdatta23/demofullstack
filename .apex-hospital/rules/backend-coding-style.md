# Apex Hospital Backend - Python/FastAPI Coding Style Guide

## Project Architecture

### Directory Structure
```
app/
├── api/
│   └── v1/                    # API version 1
│       ├── auth/              # Authentication endpoints
│       ├── doctors/           # Doctor management
│       ├── patients/          # Patient management
│       └── appointments/      # Appointment system
├── models/                    # SQLAlchemy models
├── schemas/                   # Pydantic schemas
├── services/                  # Business logic layer
├── utils/                     # Utility functions
├── middleware/                # Custom middleware
├── tasks/                     # Celery tasks
├── config.py                  # Configuration
├── database.py                # Database setup
└── main.py                    # FastAPI app entry
```

## Import Organization

### Import Order (Always follow this order)
```python
# 1. Standard library imports
import os
import logging
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any

# 2. Third-party imports
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import Column, Integer, String, Boolean
from pydantic import BaseModel, validator

# 3. Local application imports
from app.config import settings
from app.database import get_db, Base
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.services.auth import AuthService
from app.utils.security import verify_password
```

## Code Style Standards

### Function and Class Naming
```python
# ✅ Correct - snake_case for functions and variables
def create_user_account(user_data: UserCreate) -> User:
    pass

def validate_email_format(email: str) -> bool:
    pass

# ✅ Correct - PascalCase for classes
class UserService:
    pass

class AppointmentManager:
    pass

# ✅ Correct - UPPER_SNAKE_CASE for constants
MAX_LOGIN_ATTEMPTS = 5
DEFAULT_PAGE_SIZE = 20
TOKEN_EXPIRE_MINUTES = 30
```

### Type Hints (Always Required)
```python
# ✅ Always use type hints
from typing import List, Optional, Dict, Any

def get_user_by_id(user_id: int, db: AsyncSession) -> Optional[User]:
    pass

def create_appointment(
    appointment_data: AppointmentCreate,
    current_user: User,
    db: AsyncSession
) -> Appointment:
    pass

# ✅ Return type annotations
async def authenticate_user(email: str, password: str) -> Dict[str, Any]:
    return {"user": user, "token": token}
```

## FastAPI Route Structure

### Route Organization
```python
# ✅ Correct route structure
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.user import UserCreate, UserResponse
from app.services.user import UserService

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
) -> UserResponse:
    """
    Create a new user account.
    
    Args:
        user_data: User registration data
        db: Database session
        
    Returns:
        Created user information
        
    Raises:
        HTTPException: If email already exists or validation fails
    """
    try:
        service = UserService(db)
        return await service.create_user(user_data)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
```

### Error Handling Pattern
```python
# ✅ Consistent error handling
@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db)
) -> UserResponse:
    try:
        service = UserService(db)
        user = await service.get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user
    except HTTPException:
        raise  # Re-raise HTTP exceptions
    except Exception as e:
        logger.error(f"Error fetching user {user_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
```

## SQLAlchemy Models

### Model Structure
```python
# ✅ Correct model structure
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Required fields
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    
    # Optional fields
    phone = Column(String(20), unique=True, index=True)
    profile_image_url = Column(String(500))
    
    # Status flags
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Timestamps (always include)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    appointments = relationship("Appointment", back_populates="patient")
    
    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email})>"
```

### Enum Usage
```python
# ✅ Use string enums for database compatibility
import enum

class UserRole(str, enum.Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"
    STAFF = "staff"

class AppointmentStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
```

## Pydantic Schemas

### Schema Structure
```python
# ✅ Correct schema structure
from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    """Base user schema with common fields"""
    email: EmailStr
    full_name: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    """Schema for user creation"""
    password: str
    confirm_password: str
    
    @validator('confirm_password')
    def passwords_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        return v

class UserResponse(UserBase):
    """Schema for user response (excludes sensitive data)"""
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
```

## Service Layer Pattern

### Service Structure
```python
# ✅ Service layer for business logic
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.security import hash_password

class UserService:
    """User business logic service"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create_user(self, user_data: UserCreate) -> User:
        """Create a new user account"""
        # Check if user exists
        existing_user = await self.get_user_by_email(user_data.email)
        if existing_user:
            raise ValueError("Email already registered")
        
        # Create user
        db_user = User(
            email=user_data.email,
            full_name=user_data.full_name,
            phone=user_data.phone,
            password_hash=hash_password(user_data.password)
        )
        
        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)
        
        return db_user
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email address"""
        result = await self.db.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()
```

## Database Operations

### Query Patterns
```python
# ✅ Async database operations
from sqlalchemy import select, update, delete
from sqlalchemy.orm import selectinload

# Simple select
async def get_user_by_id(db: AsyncSession, user_id: int) -> Optional[User]:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

# Select with relationships
async def get_user_with_appointments(db: AsyncSession, user_id: int) -> Optional[User]:
    result = await db.execute(
        select(User)
        .options(selectinload(User.appointments))
        .where(User.id == user_id)
    )
    return result.scalar_one_or_none()

# Update operation
async def update_user_status(db: AsyncSession, user_id: int, is_active: bool) -> bool:
    result = await db.execute(
        update(User)
        .where(User.id == user_id)
        .values(is_active=is_active)
    )
    await db.commit()
    return result.rowcount > 0
```

## Security Guidelines

### Password Handling
```python
# ✅ Secure password handling
from passlib.context import CryptContext
import secrets

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return pwd_context.verify(plain_password, hashed_password)

def generate_secure_token() -> str:
    """Generate cryptographically secure token"""
    return secrets.token_urlsafe(32)
```

### Input Validation
```python
# ✅ Always validate inputs
from pydantic import validator
import re

class UserCreate(BaseModel):
    email: EmailStr
    phone: str
    
    @validator('phone')
    def validate_phone(cls, v):
        # Indian phone number validation
        pattern = r'^(\+91|91)?[6-9]\d{9}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid Indian phone number')
        return v
```

## Logging Standards

### Logging Configuration
```python
# ✅ Structured logging
import logging
from app.config import settings

# Configure logger
logger = logging.getLogger(__name__)

# Log levels by environment
if settings.ENVIRONMENT == "development":
    logging.basicConfig(level=logging.DEBUG)
else:
    logging.basicConfig(level=logging.INFO)

# Usage in functions
async def create_user(user_data: UserCreate) -> User:
    logger.info(f"Creating user account for email: {user_data.email}")
    
    try:
        # Business logic
        user = await service.create_user(user_data)
        logger.info(f"User created successfully: {user.id}")
        return user
    except Exception as e:
        logger.error(f"Failed to create user: {e}")
        raise
```

## Testing Guidelines

### Test Structure
```python
# ✅ Test file structure
import pytest
from httpx import AsyncClient
from app.main import app
from app.database import get_db
from tests.conftest import override_get_db

@pytest.mark.asyncio
async def test_create_user():
    """Test user creation endpoint"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        app.dependency_overrides[get_db] = override_get_db
        
        user_data = {
            "email": "test@example.com",
            "full_name": "Test User",
            "password": "securepassword123",
            "confirm_password": "securepassword123"
        }
        
        response = await client.post("/api/v1/users/", json=user_data)
        
        assert response.status_code == 201
        assert response.json()["email"] == user_data["email"]
```

## Configuration Management

### Settings Pattern
```python
# ✅ Secure configuration
from pydantic_settings import BaseSettings
from pydantic import validator

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    
    @validator('SECRET_KEY')
    def validate_secret_key(cls, v):
        if len(v) < 64:
            raise ValueError('SECRET_KEY must be at least 64 characters')
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

## API Documentation

### Docstring Standards
```python
# ✅ Comprehensive docstrings
async def create_appointment(
    appointment_data: AppointmentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> AppointmentResponse:
    """
    Create a new appointment.
    
    Args:
        appointment_data: Appointment details including doctor_id, date, time
        current_user: Authenticated user making the appointment
        db: Database session
        
    Returns:
        AppointmentResponse: Created appointment details
        
    Raises:
        HTTPException: 
            - 400: Invalid appointment data or time slot unavailable
            - 404: Doctor not found
            - 409: Appointment slot already booked
            
    Example:
        ```python
        appointment_data = AppointmentCreate(
            doctor_id=1,
            appointment_date="2024-01-15",
            appointment_time="10:00"
        )
        ```
    """
```

## Performance Guidelines

### Database Optimization
```python
# ✅ Efficient queries
from sqlalchemy.orm import selectinload, joinedload

# Use selectinload for one-to-many relationships
async def get_doctor_with_appointments(db: AsyncSession, doctor_id: int):
    result = await db.execute(
        select(Doctor)
        .options(selectinload(Doctor.appointments))
        .where(Doctor.id == doctor_id)
    )
    return result.scalar_one_or_none()

# Use joinedload for many-to-one relationships
async def get_appointments_with_doctors(db: AsyncSession):
    result = await db.execute(
        select(Appointment)
        .options(joinedload(Appointment.doctor))
        .limit(50)
    )
    return result.scalars().all()
```

### Caching Pattern
```python
# ✅ Redis caching
from redis import Redis
import json

redis_client = Redis.from_url(settings.REDIS_URL)

async def get_cached_user(user_id: int) -> Optional[dict]:
    """Get user from cache"""
    cached = redis_client.get(f"user:{user_id}")
    if cached:
        return json.loads(cached)
    return None

async def cache_user(user_id: int, user_data: dict, ttl: int = 3600):
    """Cache user data"""
    redis_client.setex(
        f"user:{user_id}",
        ttl,
        json.dumps(user_data)
    )
```

## File Naming Conventions

- **Models**: `snake_case.py` → `user.py`, `appointment.py`
- **Schemas**: `snake_case.py` → `user_schemas.py`, `auth_schemas.py`
- **Services**: `snake_case.py` → `user_service.py`, `email_service.py`
- **Routes**: `routes.py` or `endpoints.py`
- **Tests**: `test_*.py` → `test_user.py`, `test_auth.py`

## Code Review Checklist

### Before Submitting PR
- [ ] All functions have type hints
- [ ] Proper error handling with try/catch
- [ ] Input validation using Pydantic
- [ ] Secure password handling
- [ ] Proper logging statements
- [ ] Database queries are optimized
- [ ] Tests written for new functionality
- [ ] Docstrings for public functions
- [ ] No hardcoded secrets or URLs
- [ ] Follows import order

## Don'ts - Common Mistakes

### ❌ Security Anti-patterns
```python
# ❌ Don't store plain text passwords
user.password = request.password

# ❌ Don't use string formatting for SQL
query = f"SELECT * FROM users WHERE id = {user_id}"

# ❌ Don't expose sensitive data in responses
return {"user": user, "password_hash": user.password_hash}
```

### ❌ Performance Anti-patterns
```python
# ❌ Don't use sync operations in async functions
def sync_function():
    time.sleep(1)

async def async_function():
    sync_function()  # Blocks event loop

# ❌ Don't make N+1 queries
for user in users:
    appointments = await get_user_appointments(user.id)  # N+1 problem
```

This guide ensures secure, maintainable, and performant Python/FastAPI code for the Apex Hospital backend.