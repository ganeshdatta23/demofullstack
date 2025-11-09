"""
Patients routes
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db

router = APIRouter()


@router.get("/profile")
async def get_patient_profile(
    db: AsyncSession = Depends(get_db)
):
    """Get patient profile"""
    return {"message": "Patient profile"}


@router.put("/profile")
async def update_patient_profile(
    db: AsyncSession = Depends(get_db)
):
    """Update patient profile"""
    return {"message": "Profile updated"}


@router.get("/medical-history")
async def get_medical_history(
    db: AsyncSession = Depends(get_db)
):
    """Get patient medical history"""
    return {"history": []}