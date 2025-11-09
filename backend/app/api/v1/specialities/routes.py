"""
Specialities routes
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db

router = APIRouter()


@router.get("/")
async def get_specialities(
    db: AsyncSession = Depends(get_db)
):
    """Get all specialities"""
    return {"specialities": []}


@router.get("/{speciality_id}")
async def get_speciality(
    speciality_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get speciality by ID"""
    return {"id": speciality_id, "message": "Speciality details"}


@router.get("/{speciality_id}/doctors")
async def get_speciality_doctors(
    speciality_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get doctors by speciality"""
    return {"speciality_id": speciality_id, "doctors": []}