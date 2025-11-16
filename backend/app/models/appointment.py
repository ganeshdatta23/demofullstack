from sqlalchemy import Column, Integer, Date, Time, Text, DECIMAL, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class AppointmentStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    RESCHEDULED = "rescheduled"

class AppointmentType(str, enum.Enum):
    CONSULTATION = "consultation"
    FOLLOW_UP = "follow_up"
    EMERGENCY = "emergency"
    SURGERY = "surgery"
    DIAGNOSTIC = "diagnostic"

class ConsultationMode(str, enum.Enum):
    ONSITE = "onsite"
    ONLINE = "online"
    HOME_VISIT = "home_visit"

class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

class Appointment(Base):
    __tablename__ = "appointments"
    
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False, index=True)
    
    # Appointment Details
    appointment_date = Column(Date, nullable=False, index=True)
    appointment_time = Column(Time, nullable=False)
    duration = Column(Integer, default=30)  # in minutes
    appointment_type = Column(Enum(AppointmentType), default=AppointmentType.CONSULTATION)
    consultation_mode = Column(Enum(ConsultationMode), default=ConsultationMode.ONSITE)
    
    # Status and Notes
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.PENDING, index=True)
    reason_for_visit = Column(Text)
    notes = Column(Text)
    prescription = Column(Text)
    
    # Payment Information
    consultation_fee = Column(DECIMAL(10, 2))
    payment_status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    cancelled_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    
    # Relationships
    patient = relationship("Patient", back_populates="appointments")
    doctor = relationship("Doctor", back_populates="appointments")