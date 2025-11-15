"""
Security middleware for enhanced protection
"""

from fastapi import Request, Response
from fastapi.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import time
from collections import defaultdict
from app.config import settings


class SecurityMiddleware(BaseHTTPMiddleware):
    """Enhanced security middleware with rate limiting and security headers"""
    
    def __init__(self, app):
        super().__init__(app)
        self.rate_limit_storage = defaultdict(list)
        self.max_requests = 100  # requests per minute
        self.time_window = 60  # seconds
    
    async def dispatch(self, request: Request, call_next):
        # Rate limiting
        if not self._check_rate_limit(request):
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded"}
            )
        
        # Process request
        response = await call_next(request)
        
        # Add security headers
        self._add_security_headers(response)
        
        return response
    
    def _check_rate_limit(self, request: Request) -> bool:
        """Simple rate limiting based on IP"""
        if settings.ENVIRONMENT == "development":
            return True  # Skip rate limiting in development
        
        client_ip = self._get_client_ip(request)
        current_time = time.time()
        
        # Clean old requests
        self.rate_limit_storage[client_ip] = [
            req_time for req_time in self.rate_limit_storage[client_ip]
            if current_time - req_time < self.time_window
        ]
        
        # Check rate limit
        if len(self.rate_limit_storage[client_ip]) >= self.max_requests:
            return False
        
        # Add current request
        self.rate_limit_storage[client_ip].append(current_time)
        return True
    
    def _get_client_ip(self, request: Request) -> str:
        """Get client IP with proxy support"""
        # Check for forwarded headers (common in production)
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            return forwarded_for.split(",")[0].strip()
        
        real_ip = request.headers.get("X-Real-IP")
        if real_ip:
            return real_ip
        
        return request.client.host if request.client else "unknown"
    
    def _add_security_headers(self, response: Response):
        """Add comprehensive security headers"""
        # Prevent XSS attacks
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        
        # HSTS for HTTPS
        if settings.ENVIRONMENT == "production":
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        
        # Content Security Policy
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: https:; "
            "font-src 'self' https:; "
            "connect-src 'self' https:; "
            "frame-ancestors 'none';"
        )
        
        # Referrer Policy
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        # Permissions Policy
        response.headers["Permissions-Policy"] = (
            "geolocation=(), "
            "microphone=(), "
            "camera=(), "
            "payment=(), "
            "usb=(), "
            "magnetometer=(), "
            "gyroscope=(), "
            "speaker=()"
        )