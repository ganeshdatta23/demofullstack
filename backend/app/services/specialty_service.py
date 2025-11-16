from sqlalchemy.orm import Session
from app.models import Specialty
from typing import List

class SpecialtyService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all_specialties(self) -> List[Specialty]:
        return self.db.query(Specialty).filter(Specialty.is_active == True).order_by(Specialty.name).all()
    
    def get_specialty_by_id(self, specialty_id: int) -> Specialty:
        return self.db.query(Specialty).filter(Specialty.id == specialty_id, Specialty.is_active == True).first()