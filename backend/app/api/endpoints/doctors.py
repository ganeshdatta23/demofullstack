from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.services import DoctorService
from app.schemas import DoctorResponse, DoctorDetail

router = APIRouter()

@router.get("/", response_model=List[DoctorResponse])
def get_doctors(
    specialty_id: Optional[int] = Query(None),
    limit: int = Query(10, le=50),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    service = DoctorService(db)
    doctors = service.get_all_doctors(specialty_id, limit, offset)
    
    # Transform to match frontend expectations
    result = []
    for doctor in doctors:
        result.append({
            "id": str(doctor.id),
            "name": doctor.user.full_name,
            "specialty": doctor.specialty.name if doctor.specialty else "",
            "experience": doctor.experience_years,
            "rating": float(doctor.rating) if doctor.rating else 0.0,
            "reviewCount": doctor.total_reviews,
            "consultationFee": float(doctor.consultation_fee_onsite) if doctor.consultation_fee_onsite else 0,
            "location": "Chennai",  # Default location
            "availableToday": doctor.is_available,
            "profileImage": doctor.user.profile_image_url,
            "languages": doctor.languages or [],
            "qualifications": doctor.qualification or [],
            "bio": doctor.bio
        })
    
    return result

@router.get("/{doctor_id}", response_model=DoctorDetail)
def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    service = DoctorService(db)
    doctor = service.get_doctor_by_id(doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    return {
        "id": str(doctor.id),
        "name": doctor.user.full_name,
        "specialty": doctor.specialty.name if doctor.specialty else "",
        "experience": doctor.experience_years,
        "rating": float(doctor.rating) if doctor.rating else 0.0,
        "reviewCount": doctor.total_reviews,
        "consultationFee": float(doctor.consultation_fee_onsite) if doctor.consultation_fee_onsite else 0,
        "location": "Chennai",
        "availableToday": doctor.is_available,
        "profileImage": doctor.user.profile_image_url,
        "languages": doctor.languages or [],
        "qualifications": doctor.qualification or [],
        "bio": doctor.bio,
        "awards": doctor.awards or [],
        "specializations": [doctor.specialty.name] if doctor.specialty else [],
        "workingHours": {
            "monday": "9:00 AM - 5:00 PM",
            "tuesday": "9:00 AM - 5:00 PM",
            "wednesday": "9:00 AM - 5:00 PM",
            "thursday": "9:00 AM - 5:00 PM",
            "friday": "9:00 AM - 5:00 PM",
            "saturday": "9:00 AM - 1:00 PM"
        }
    }

@router.get("/search")
def search_doctors(
    q: str = Query(..., min_length=2),
    specialty_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    service = DoctorService(db)
    doctors = service.search_doctors(q, specialty_id)
    
    result = []
    for doctor in doctors:
        result.append({
            "id": str(doctor.id),
            "name": doctor.user.full_name,
            "specialty": doctor.specialty.name if doctor.specialty else "",
            "experience": doctor.experience_years,
            "rating": float(doctor.rating) if doctor.rating else 0.0,
            "reviewCount": doctor.total_reviews,
            "consultationFee": float(doctor.consultation_fee_onsite) if doctor.consultation_fee_onsite else 0,
            "location": "Chennai",
            "availableToday": doctor.is_available,
            "profileImage": doctor.user.profile_image_url,
            "languages": doctor.languages or [],
            "qualifications": doctor.qualification or [],
            "bio": doctor.bio
        })
    
    return result