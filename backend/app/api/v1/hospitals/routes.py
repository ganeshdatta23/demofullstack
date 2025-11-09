"""
Hospitals routes
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.database import get_db

router = APIRouter()


@router.get("/")
async def get_hospitals(
    city: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    """Get list of hospitals"""
    return {
        "hospitals": [],
        "total": 0,
        "skip": skip,
        "limit": limit
    }


@router.get("/{hospital_id}")
async def get_hospital(
    hospital_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get hospital by ID"""
    return {"id": hospital_id, "message": "Hospital details"}


@router.get("/{hospital_id}/doctors")
async def get_hospital_doctors(
    hospital_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get doctors in hospital"""
    return {"hospital_id": hospital_id, "doctors": []}