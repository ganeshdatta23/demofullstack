from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.services import HealthPackageService
from app.schemas import HealthPackageResponse

router = APIRouter()

@router.get("/", response_model=List[HealthPackageResponse])
def get_health_packages(db: Session = Depends(get_db)):
    service = HealthPackageService(db)
    packages = service.get_all_packages()
    
    result = []
    for package in packages:
        result.append({
            "id": package.id,
            "title": package.name,
            "description": package.description,
            "price": float(package.price),
            "originalPrice": float(package.original_price) if package.original_price else None,
            "items": package.tests_included or [],
            "duration": f"{package.duration_hours} hours" if package.duration_hours else None,
            "imageUrl": None,
            "category": package.category,
            "popular": package.is_popular
        })
    
    return result

@router.get("/{package_id}", response_model=HealthPackageResponse)
def get_health_package(package_id: int, db: Session = Depends(get_db)):
    service = HealthPackageService(db)
    package = service.get_package_by_id(package_id)
    if not package:
        raise HTTPException(status_code=404, detail="Health package not found")
    
    return {
        "id": package.id,
        "title": package.name,
        "description": package.description,
        "price": float(package.price),
        "originalPrice": float(package.original_price) if package.original_price else None,
        "items": package.tests_included or [],
        "duration": f"{package.duration_hours} hours" if package.duration_hours else None,
        "imageUrl": None,
        "category": package.category,
        "popular": package.is_popular
    }