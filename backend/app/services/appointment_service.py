from sqlalchemy.orm import Session, joinedload
from app.models import Appointment, Patient, Doctor
from app.schemas.appointment import AppointmentCreate
from typing import List, Optional
from datetime import datetime, date, time

class AppointmentService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_appointment(self, appointment_data: AppointmentCreate, patient_id: int) -> Appointment:
        appointment = Appointment(
            patient_id=patient_id,
            doctor_id=appointment_data.doctorId,
            appointment_date=datetime.strptime(appointment_data.appointmentDate, "%Y-%m-%d").date(),
            appointment_time=datetime.strptime(appointment_data.appointmentTime, "%H:%M").time(),
            reason_for_visit=appointment_data.reason,
            notes=appointment_data.patientNotes,
            consultation_mode="onsite" if appointment_data.type == "offline" else "online"
        )
        
        self.db.add(appointment)
        self.db.commit()
        self.db.refresh(appointment)
        return appointment
    
    def get_all_appointments(self) -> List[Appointment]:
        return self.db.query(Appointment).options(
            joinedload(Appointment.patient).joinedload(Patient.user),
            joinedload(Appointment.doctor).joinedload(Doctor.user),
            joinedload(Appointment.doctor).joinedload(Doctor.specialty)
        ).order_by(Appointment.appointment_date.desc()).all()
    
    def get_appointments_by_patient(self, patient_id: int) -> List[Appointment]:
        return self.db.query(Appointment).options(
            joinedload(Appointment.doctor).joinedload(Doctor.user),
            joinedload(Appointment.doctor).joinedload(Doctor.specialty)
        ).filter(Appointment.patient_id == patient_id).order_by(Appointment.appointment_date.desc()).all()
    
    def get_appointment_by_id(self, appointment_id: int) -> Optional[Appointment]:
        return self.db.query(Appointment).options(
            joinedload(Appointment.patient).joinedload(Patient.user),
            joinedload(Appointment.doctor).joinedload(Doctor.user),
            joinedload(Appointment.doctor).joinedload(Doctor.specialty)
        ).filter(Appointment.id == appointment_id).first()
    
    def cancel_appointment(self, appointment_id: int, reason: Optional[str] = None) -> bool:
        appointment = self.db.query(Appointment).filter(Appointment.id == appointment_id).first()
        if appointment:
            appointment.status = "cancelled"
            appointment.cancelled_at = datetime.utcnow()
            if reason:
                appointment.notes = f"Cancelled: {reason}"
            self.db.commit()
            return True
        return False