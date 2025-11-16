from sqlalchemy.orm import Session
from app.models import HealthPackage
from typing import List, Optional

class HealthPackageService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all_packages(self) -> List[HealthPackage]:
        return self.db.query(HealthPackage).filter(HealthPackage.is_active == True).order_by(HealthPackage.is_popular.desc(), HealthPackage.price).all()
    
    def get_package_by_id(self, package_id: int) -> Optional[HealthPackage]:
        return self.db.query(HealthPackage).filter(HealthPackage.id == package_id, HealthPackage.is_active == True).first()