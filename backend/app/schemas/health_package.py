from pydantic import BaseModel
from typing import Optional, List

class HealthPackageResponse(BaseModel):
    id: int
    title: str
    description: str
    price: float
    originalPrice: Optional[float] = None
    items: List[str] = []
    duration: Optional[str] = None
    imageUrl: Optional[str] = None
    category: str
    popular: bool = False
    
    class Config:
        from_attributes = True