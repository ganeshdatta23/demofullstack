"""
Application configuration management
"""

from pydantic_settings import BaseSettings
from pydantic import validator
from typing import List, Optional
import os


class Settings(BaseSettings):
    """Application settings with secure defaults"""
    
    # Application
    APP_NAME: str = "Hospital Management System"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = False  # Secure default
    
    # Database
    DATABASE_URL: str
    DATABASE_ECHO: bool = False
    
    # Security - All required in production
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    @validator('SECRET_KEY')
    def validate_secret_key(cls, v, values):
        if not v:
            raise ValueError('SECRET_KEY is required')
        
        # Check for default/insecure values
        insecure_keys = [
            'your-secret-key-change-in-production',
            'CHANGE_THIS_TO_A_SECURE_RANDOM_64_CHARACTER_STRING_IN_PRODUCTION',
            'your-secure-64-character-secret-key-replace-with-python-secrets-token-urlsafe-64',
            'secret',
            'password',
            '123456'
        ]
        
        if v in insecure_keys:
            raise ValueError('SECRET_KEY must be changed from default value')
        
        # Enforce minimum 64 characters for all environments
        if len(v) < 64:
            raise ValueError('SECRET_KEY must be at least 64 characters long for security')
        
        # Enhanced entropy validation
        unique_chars = len(set(v))
        if unique_chars < 20:
            raise ValueError(f'SECRET_KEY has insufficient entropy: only {unique_chars} unique characters (minimum 20 required)')
        
        # Check for character diversity (letters, numbers, symbols)
        has_lower = any(c.islower() for c in v)
        has_upper = any(c.isupper() for c in v)
        has_digit = any(c.isdigit() for c in v)
        has_special = any(not c.isalnum() for c in v)
        
        diversity_count = sum([has_lower, has_upper, has_digit, has_special])
        if diversity_count < 3:
            raise ValueError('SECRET_KEY must contain at least 3 character types (lowercase, uppercase, digits, special characters)')
        
        # Check for weak patterns
        if any(pattern in v.lower() for pattern in ['password', 'secret', 'key', '123', 'abc']):
            raise ValueError('SECRET_KEY must not contain common words or patterns')
        
        # Check for repeated characters (more than 3 consecutive)
        for i in range(len(v) - 3):
            if v[i] == v[i+1] == v[i+2] == v[i+3]:
                raise ValueError('SECRET_KEY must not contain more than 3 consecutive identical characters')
        
        return v
    
    @validator('DATABASE_URL')
    def validate_database_url(cls, v):
        if not v:
            raise ValueError('DATABASE_URL is required')
        return v
    
    # CORS - Restrict to specific origins in production
    ALLOWED_HOSTS: List[str] = ["http://localhost:3000", "http://localhost:9002"]
    
    @validator('ALLOWED_HOSTS')
    def validate_allowed_hosts(cls, v, values):
        if values.get('ENVIRONMENT') == 'production':
            # Ensure no wildcard origins in production
            if '*' in v or 'http://localhost' in str(v):
                raise ValueError('Remove localhost and wildcard origins in production')
        return v
    
    # External Services
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: Optional[int] = None
    SMTP_USERNAME: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    TWILIO_PHONE_NUMBER: Optional[str] = None
    
    # Payment Gateways
    RAZORPAY_KEY_ID: Optional[str] = None
    RAZORPAY_KEY_SECRET: Optional[str] = None
    
    STRIPE_PUBLISHABLE_KEY: Optional[str] = None
    STRIPE_SECRET_KEY: Optional[str] = None
    
    # File Storage
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_REGION: str = "us-east-1"
    AWS_S3_BUCKET: Optional[str] = None
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()