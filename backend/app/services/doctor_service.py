from sqlalchemy.orm import Session, joinedload
from app.models import Doctor, User, Specialty
from typing import List, Optional

class DoctorService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all_doctors(self, specialty_id: Optional[int] = None, limit: int = 10, offset: int = 0) -> List[Doctor]:
        query = self.db.query(Doctor).join(User).options(
            joinedload(Doctor.user),
            joinedload(Doctor.specialty)
        ).filter(
            User.is_active == True,
            Doctor.is_available == True
        )
        
        if specialty_id:
            query = query.filter(Doctor.specialty_id == specialty_id)
            
        return query.order_by(Doctor.rating.desc(), Doctor.total_reviews.desc()).offset(offset).limit(limit).all()
    
    def get_doctor_by_id(self, doctor_id: int) -> Optional[Doctor]:
        return self.db.query(Doctor).join(User).options(
            joinedload(Doctor.user),
            joinedload(Doctor.specialty)
        ).filter(
            Doctor.id == doctor_id,
            User.is_active == True
        ).first()
    
    def search_doctors(self, query: str, specialty_id: Optional[int] = None) -> List[Doctor]:
        search_query = self.db.query(Doctor).join(User).options(
            joinedload(Doctor.user),
            joinedload(Doctor.specialty)
        ).filter(
            User.is_active == True,
            Doctor.is_available == True,
            User.full_name.ilike(f"%{query}%")
        )
        
        if specialty_id:
            search_query = search_query.filter(Doctor.specialty_id == specialty_id)
            
        return search_query.order_by(Doctor.rating.desc()).all()