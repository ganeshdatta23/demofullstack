from sqlalchemy import Column, Integer, String, Text, DECIMAL, Boolean, ARRAY, DateTime
from sqlalchemy.sql import func
from app.database import Base

class HealthPackage(Base):
    __tablename__ = "health_packages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(DECIMAL(10, 2), nullable=False)
    original_price = Column(DECIMAL(10, 2))
    
    # Package Details
    tests_included = Column(ARRAY(Text))
    duration_hours = Column(Integer)
    category = Column(String(100))
    is_popular = Column(Boolean, default=False)
    
    # Status
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())