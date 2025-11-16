from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.services import AppointmentService
from app.schemas import AppointmentCreate, AppointmentResponse
from app.auth import get_current_user, require_patient_or_doctor
from app.models import User

router = APIRouter()

@router.post("/", response_model=AppointmentResponse)
def create_appointment(
    appointment_data: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_patient_or_doctor)
):
    # Only patients can create appointments for themselves
    if current_user.user_type != "patient":
        raise HTTPException(status_code=403, detail="Only patients can book appointments")
    
    patient_id = current_user.patient.id if current_user.patient else None
    if not patient_id:
        raise HTTPException(status_code=400, detail="Patient profile not found")
    
    service = AppointmentService(db)
    appointment = service.create_appointment(appointment_data, patient_id)
    
    return {
        "id": appointment.id,
        "patientId": appointment.patient_id,
        "doctorId": appointment.doctor_id,
        "appointmentDate": appointment.appointment_date.isoformat(),
        "appointmentTime": appointment.appointment_time.strftime("%H:%M"),
        "status": appointment.status.value,
        "reason": appointment.reason_for_visit,
        "patientNotes": appointment.notes,
        "doctorNotes": None,
        "consultationFee": float(appointment.consultation_fee) if appointment.consultation_fee else None,
        "type": "offline" if appointment.consultation_mode == "onsite" else "online",
        "createdAt": appointment.created_at.isoformat(),
        "updatedAt": appointment.updated_at.isoformat()
    }

@router.get("/", response_model=List[AppointmentResponse])
def get_appointments(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_patient_or_doctor)
):
    service = AppointmentService(db)
    
    # Doctors can see all appointments, patients only their own
    if current_user.user_type in ["doctor", "admin"]:
        appointments = service.get_all_appointments()
    else:
        patient_id = current_user.patient.id if current_user.patient else None
        if not patient_id:
            raise HTTPException(status_code=400, detail="Patient profile not found")
        appointments = service.get_appointments_by_patient(patient_id)
    
    result = []
    for appointment in appointments:
        result.append({
            "id": appointment.id,
            "patientId": appointment.patient_id,
            "doctorId": appointment.doctor_id,
            "appointmentDate": appointment.appointment_date.isoformat(),
            "appointmentTime": appointment.appointment_time.strftime("%H:%M"),
            "status": appointment.status.value,
            "reason": appointment.reason_for_visit,
            "patientNotes": appointment.notes,
            "doctorNotes": None,
            "consultationFee": float(appointment.consultation_fee) if appointment.consultation_fee else None,
            "type": "offline" if appointment.consultation_mode == "onsite" else "online",
            "createdAt": appointment.created_at.isoformat(),
            "updatedAt": appointment.updated_at.isoformat()
        })
    
    return result

@router.get("/{appointment_id}", response_model=AppointmentResponse)
def get_appointment(appointment_id: int, db: Session = Depends(get_db)):
    service = AppointmentService(db)
    appointment = service.get_appointment_by_id(appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    return {
        "id": appointment.id,
        "patientId": appointment.patient_id,
        "doctorId": appointment.doctor_id,
        "appointmentDate": appointment.appointment_date.isoformat(),
        "appointmentTime": appointment.appointment_time.strftime("%H:%M"),
        "status": appointment.status.value,
        "reason": appointment.reason_for_visit,
        "patientNotes": appointment.notes,
        "doctorNotes": None,
        "consultationFee": float(appointment.consultation_fee) if appointment.consultation_fee else None,
        "type": "offline" if appointment.consultation_mode == "onsite" else "online",
        "createdAt": appointment.created_at.isoformat(),
        "updatedAt": appointment.updated_at.isoformat()
    }

@router.post("/{appointment_id}/cancel")
def cancel_appointment(appointment_id: int, db: Session = Depends(get_db)):
    service = AppointmentService(db)
    success = service.cancel_appointment(appointment_id)
    if not success:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"message": "Appointment cancelled successfully"}