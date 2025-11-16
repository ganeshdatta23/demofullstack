from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.services import SpecialtyService
from app.schemas import SpecialtyResponse

router = APIRouter()

@router.get("/", response_model=List[SpecialtyResponse])
def get_specialties(db: Session = Depends(get_db)):
    service = SpecialtyService(db)
    specialties = service.get_all_specialties()
    return specialties

@router.get("/{specialty_id}", response_model=SpecialtyResponse)
def get_specialty(specialty_id: int, db: Session = Depends(get_db)):
    service = SpecialtyService(db)
    specialty = service.get_specialty_by_id(specialty_id)
    if not specialty:
        raise HTTPException(status_code=404, detail="Specialty not found")
    return specialty