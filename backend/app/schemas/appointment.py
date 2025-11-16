from pydantic import BaseModel
from typing import Optional
from datetime import date, time
from app.models.appointment import AppointmentStatus, AppointmentType

class AppointmentCreate(BaseModel):
    doctorId: int
    appointmentDate: str
    appointmentTime: str
    reason: Optional[str] = None
    patientNotes: Optional[str] = None
    type: str = "offline"

class AppointmentResponse(BaseModel):
    id: int
    patientId: int
    doctorId: int
    appointmentDate: str
    appointmentTime: str
    status: str
    reason: Optional[str] = None
    patientNotes: Optional[str] = None
    doctorNotes: Optional[str] = None
    consultationFee: Optional[float] = None
    type: str
    createdAt: str
    updatedAt: str
    
    class Config:
        from_attributes = True