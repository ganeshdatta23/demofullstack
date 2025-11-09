"""
Doctors routes
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.database import get_db

router = APIRouter()


@router.get("/")
async def get_doctors(
    speciality: Optional[str] = Query(None),
    hospital_id: Optional[int] = Query(None),
    city: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    """Get list of doctors with filters"""
    return {
        "doctors": [],
        "total": 0,
        "skip": skip,
        "limit": limit
    }


@router.get("/{doctor_id}")
async def get_doctor(
    doctor_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get doctor by ID"""
    return {"id": doctor_id, "message": "Doctor details"}


@router.get("/{doctor_id}/availability")
async def get_doctor_availability(
    doctor_id: int,
    date: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    """Get doctor availability"""
    return {"doctor_id": doctor_id, "availability": []}