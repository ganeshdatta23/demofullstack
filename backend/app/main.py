"""
FastAPI Hospital Management System
Main application entry point
"""

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.security import HTTPBearer
from contextlib import asynccontextmanager
import uvicorn
import logging
import time

from app.config import settings
from app.database import engine, Base
from app.api.router import api_router
from app.middleware.error_handler import add_exception_handlers
from app.middleware.security import SecurityMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events with proper error handling"""
    # Startup
    logger = logging.getLogger(__name__)
    logger.info("Hospital Management System Starting...")
    
    try:
        # Create database tables
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Failed to create database tables: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("Hospital Management System Shutting down...")


# Configure logging
logging.basicConfig(
    level=logging.INFO if settings.ENVIRONMENT == "development" else logging.WARNING,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

# Create FastAPI application
app = FastAPI(
    title="Hospital Management System API",
    description="Comprehensive hospital management platform API",
    version=settings.VERSION,
    docs_url="/api/docs" if settings.DEBUG else None,
    redoc_url="/api/redoc" if settings.DEBUG else None,
    openapi_url="/api/openapi.json" if settings.DEBUG else None,
    lifespan=lifespan
)

# Security
security = HTTPBearer()

# Add middleware with secure CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=[
        "Accept",
        "Accept-Language",
        "Content-Language",
        "Content-Type",
        "Authorization",
        "X-Requested-With",
    ],
    expose_headers=["X-Process-Time"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS
)

# Add security middleware
app.add_middleware(SecurityMiddleware)

# Add exception handlers
add_exception_handlers(app)

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """Add processing time header and secure request logging"""
    start_time = time.time()
    
    # Log request with privacy considerations
    logger = logging.getLogger(__name__)
    client_ip = "unknown"
    if request.client:
        # Anonymize IP for privacy (keep first 3 octets for IPv4)
        ip = request.client.host
        if '.' in ip and ip.count('.') == 3:  # IPv4
            parts = ip.split('.')
            client_ip = f"{parts[0]}.{parts[1]}.{parts[2]}.xxx"
        else:
            client_ip = "[anonymized]"
    
    logger.info(f"{request.method} {request.url.path} - {client_ip}")
    
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    
    return response

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Hospital Management System API",
        "version": settings.VERSION,
        "status": "active",
        "environment": settings.ENVIRONMENT
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "hospital-api"}


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.ENVIRONMENT == "development",
        log_level="info" if settings.DEBUG else "warning",
        access_log=settings.DEBUG
    )