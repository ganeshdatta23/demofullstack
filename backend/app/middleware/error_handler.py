"""
Global exception handlers
"""

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from pydantic import ValidationError
import logging
import traceback
import uuid
from datetime import datetime

logger = logging.getLogger(__name__)


def add_exception_handlers(app: FastAPI):
    """Add global exception handlers to FastAPI app"""
    
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail, "status_code": exc.status_code}
        )
    
    @app.exception_handler(ValidationError)
    async def validation_exception_handler(request: Request, exc: ValidationError):
        error_id = str(uuid.uuid4())
        logger.warning(f"Validation error [{error_id}]: {exc}")
        return JSONResponse(
            status_code=422,
            content={
                "detail": "Validation error",
                "errors": exc.errors(),
                "error_id": error_id,
                "status_code": 422
            }
        )
    
    @app.exception_handler(SQLAlchemyError)
    async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
        error_id = str(uuid.uuid4())
        logger.error(f"Database error [{error_id}]: {exc}")
        logger.error(f"Traceback [{error_id}]: {traceback.format_exc()}")
        return JSONResponse(
            status_code=500,
            content={
                "detail": "Database operation failed",
                "error_id": error_id,
                "status_code": 500
            }
        )
    
    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        error_id = str(uuid.uuid4())
        logger.error(f"Unexpected error [{error_id}]: {exc}")
        logger.error(f"Traceback [{error_id}]: {traceback.format_exc()}")
        
        return JSONResponse(
            status_code=500,
            content={
                "detail": "Internal server error",
                "error_id": error_id,
                "status_code": 500,
                "timestamp": datetime.utcnow().isoformat()
            }
        )