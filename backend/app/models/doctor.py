from sqlalchemy import Column, Integer, String, Boolean, Text, DECIMAL, Time, ARRAY, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Doctor(Base):
    __tablename__ = "doctors"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    license_number = Column(String(255), unique=True, nullable=False, index=True)
    specialty_id = Column(Integer, ForeignKey("specialties.id"))
    qualification = Column(ARRAY(Text))
    experience_years = Column(Integer, default=0)
    
    # Practice Information
    consultation_fee_onsite = Column(DECIMAL(10, 2))
    consultation_fee_online = Column(DECIMAL(10, 2))
    consultation_duration = Column(Integer, default=30)
    
    # Availability
    available_days = Column(ARRAY(Integer))  # 0=Sunday, 1=Monday, etc.
    available_from = Column(Time)
    available_to = Column(Time)
    
    # Professional Details
    bio = Column(Text)
    languages = Column(ARRAY(Text))
    awards = Column(ARRAY(Text))
    
    # Ratings
    rating = Column(DECIMAL(3, 2), default=0.0)
    total_reviews = Column(Integer, default=0)
    
    # Status
    is_available = Column(Boolean, default=True, index=True)
    is_verified = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="doctor")
    specialty = relationship("Specialty", back_populates="doctors")
    appointments = relationship("Appointment", back_populates="doctor")