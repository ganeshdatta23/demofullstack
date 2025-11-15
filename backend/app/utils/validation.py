"""
Enhanced validation utilities with security considerations
"""

import re
import html
from typing import Any, Dict, List, Optional
# Removed unused pydantic validator import
import bleach


class ValidationUtils:
    """Comprehensive validation utilities"""
    
    # Regex patterns
    EMAIL_PATTERN = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    PHONE_PATTERN = re.compile(r'^\+?[\d\s\-\(\)]{10,15}$')
    NAME_PATTERN = re.compile(r'^[a-zA-Z\s\.\-\']{2,50}$')
    PASSWORD_PATTERN = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')
    
    # Allowed HTML tags for rich text (if needed)
    ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li']
    ALLOWED_ATTRIBUTES = {}
    
    @classmethod
    def validate_email(cls, email: str) -> bool:
        """Validate email format"""
        if not email or len(email) > 254:
            return False
        return bool(cls.EMAIL_PATTERN.match(email.lower()))
    
    @classmethod
    def validate_phone(cls, phone: str) -> bool:
        """Validate phone number format"""
        if not phone:
            return False
        # Remove all spaces and special characters for validation
        clean_phone = re.sub(r'[\s\-\(\)]', '', phone)
        return bool(cls.PHONE_PATTERN.match(phone)) and len(clean_phone) >= 10
    
    @classmethod
    def validate_name(cls, name: str) -> bool:
        """Validate name format"""
        if not name or len(name.strip()) < 2:
            return False
        return bool(cls.NAME_PATTERN.match(name.strip()))
    
    @classmethod
    def validate_password_strength(cls, password: str) -> Dict[str, bool]:
        """Comprehensive password validation"""
        return {
            'min_length': len(password) >= 8,
            'max_length': len(password) <= 128,
            'has_uppercase': bool(re.search(r'[A-Z]', password)),
            'has_lowercase': bool(re.search(r'[a-z]', password)),
            'has_digit': bool(re.search(r'\d', password)),
            'has_special': bool(re.search(r'[@$!%*?&]', password)),
            'no_common_patterns': not cls._has_common_patterns(password),
            'is_valid': bool(cls.PASSWORD_PATTERN.match(password))
        }
    
    @classmethod
    def _has_common_patterns(cls, password: str) -> bool:
        """Check for common weak password patterns"""
        common_patterns = [
            'password', '123456', 'qwerty', 'abc123', 
            'password123', 'admin', 'letmein', 'welcome'
        ]
        password_lower = password.lower()
        return any(pattern in password_lower for pattern in common_patterns)
    
    @classmethod
    def sanitize_html(cls, text: str) -> str:
        """Sanitize HTML content to prevent XSS"""
        if not text:
            return ""
        
        # Use bleach to clean HTML
        cleaned = bleach.clean(
            text,
            tags=cls.ALLOWED_TAGS,
            attributes=cls.ALLOWED_ATTRIBUTES,
            strip=True
        )
        
        return cleaned.strip()
    
    @classmethod
    def sanitize_input(cls, text: str, max_length: int = 1000) -> str:
        """Sanitize general text input"""
        if not text:
            return ""
        
        # HTML escape
        sanitized = html.escape(text.strip())
        
        # Truncate if too long
        if len(sanitized) > max_length:
            sanitized = sanitized[:max_length]
        
        return sanitized
    
    @classmethod
    def validate_file_upload(cls, filename: str, content_type: str, file_size: int) -> Dict[str, Any]:
        """Validate file upload parameters"""
        # Allowed file types
        allowed_types = {
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'application/pdf', 'text/plain', 'text/csv',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
        
        # Allowed extensions
        allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.txt', '.csv', '.docx'}
        
        # Max file size (10MB)
        max_size = 10 * 1024 * 1024
        
        # Get file extension
        file_ext = '.' + filename.split('.')[-1].lower() if '.' in filename else ''
        
        return {
            'valid_type': content_type in allowed_types,
            'valid_extension': file_ext in allowed_extensions,
            'valid_size': file_size <= max_size,
            'valid_filename': cls._validate_filename(filename),
            'is_valid': (
                content_type in allowed_types and
                file_ext in allowed_extensions and
                file_size <= max_size and
                cls._validate_filename(filename)
            )
        }
    
    @classmethod
    def _validate_filename(cls, filename: str) -> bool:
        """Validate filename for security"""
        if not filename or len(filename) > 255:
            return False
        
        # Check for dangerous patterns
        dangerous_patterns = ['..', '/', '\\', '<', '>', ':', '"', '|', '?', '*']
        return not any(pattern in filename for pattern in dangerous_patterns)
    
    @classmethod
    def validate_json_structure(cls, data: Dict[str, Any], required_fields: List[str]) -> Dict[str, Any]:
        """Validate JSON structure and required fields"""
        errors = []
        
        # Check required fields
        for field in required_fields:
            if field not in data:
                errors.append(f"Missing required field: {field}")
            elif data[field] is None or (isinstance(data[field], str) and not data[field].strip()):
                errors.append(f"Field '{field}' cannot be empty")
        
        return {
            'is_valid': len(errors) == 0,
            'errors': errors
        }


# Create singleton instance
validation_utils = ValidationUtils()