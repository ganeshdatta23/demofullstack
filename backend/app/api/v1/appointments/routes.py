"""
Appointments routes
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db

router = APIRouter()


@router.get("/")
async def get_appointments(
    db: AsyncSession = Depends(get_db)
):
    """Get user appointments"""
    return {"appointments": []}


@router.post("/")
async def create_appointment(
    db: AsyncSession = Depends(get_db)
):
    """Create new appointment"""
    return {"message": "Appointment created"}


@router.get("/{appointment_id}")
async def get_appointment(
    appointment_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get appointment by ID"""
    return {"id": appointment_id, "message": "Appointment details"}


@router.put("/{appointment_id}")
async def update_appointment(
    appointment_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Update appointment"""
    return {"id": appointment_id, "message": "Appointment updated"}


@router.delete("/{appointment_id}")
async def cancel_appointment(
    appointment_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Cancel appointment"""
    return {"id": appointment_id, "message": "Appointment cancelled"}