from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal

class DoctorResponse(BaseModel):
    id: int
    name: str
    specialty: str
    experience: int
    rating: float
    reviewCount: int
    consultationFee: Optional[float] = None
    location: Optional[str] = None
    availableToday: bool = True
    profileImage: Optional[str] = None
    languages: List[str] = []
    qualifications: List[str] = []
    bio: Optional[str] = None
    
    class Config:
        from_attributes = True

class DoctorDetail(DoctorResponse):
    awards: List[str] = []
    specializations: List[str] = []
    workingHours: dict = {}
    
    class Config:
        from_attributes = True