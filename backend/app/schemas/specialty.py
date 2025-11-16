from pydantic import BaseModel
from typing import Optional

class SpecialtyResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    icon: Optional[str] = None
    
    class Config:
        from_attributes = True