from sqlalchemy import Column, Integer, String, Text, DECIMAL, Date, ForeignKey, ARRAY, Enum, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class GenderType(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class Patient(Base):
    __tablename__ = "patients"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    
    # Personal Information
    date_of_birth = Column(Date)
    gender = Column(Enum(GenderType))
    blood_group = Column(String(10), index=True)
    height = Column(DECIMAL(5, 2))  # in cm
    weight = Column(DECIMAL(5, 2))  # in kg
    
    # Address Information
    address = Column(Text)
    city = Column(String(100))
    state = Column(String(100))
    country = Column(String(100))
    zipcode = Column(String(20))
    
    # Emergency Contact
    emergency_contact_name = Column(String(255))
    emergency_contact_phone = Column(String(20))
    
    # Insurance Information
    insurance_provider = Column(String(255))
    insurance_policy_number = Column(String(255))
    insurance_expiry_date = Column(Date)
    
    # Medical Information
    medical_conditions = Column(ARRAY(Text))
    allergies = Column(ARRAY(Text))
    current_medications = Column(ARRAY(Text))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="patient")
    appointments = relationship("Appointment", back_populates="patient")