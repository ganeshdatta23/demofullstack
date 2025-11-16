"""
Hospital Management System API
Clean, professional backend with proper architecture
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.database import engine, Base
import os

# Create tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI(
    title="Hospital Management API",
    version="1.0.0",
    description="Professional hospital management system API"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")

# Root endpoints
@app.get("/")
async def root():
    return {"message": "Hospital Management API", "status": "active"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)