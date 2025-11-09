"""
Main API router that combines all API routes
"""

from fastapi import APIRouter
from app.api.v1.auth.routes import router as auth_router
from app.api.v1.patients.routes import router as patients_router
from app.api.v1.doctors.routes import router as doctors_router
from app.api.v1.appointments.routes import router as appointments_router
from app.api.v1.specialities.routes import router as specialities_router
from app.api.v1.hospitals.routes import router as hospitals_router

api_router = APIRouter()

# Include all route modules
api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(patients_router, prefix="/patients", tags=["Patients"])
api_router.include_router(doctors_router, prefix="/doctors", tags=["Doctors"])
api_router.include_router(appointments_router, prefix="/appointments", tags=["Appointments"])
api_router.include_router(specialities_router, prefix="/specialities", tags=["Specialities"])
api_router.include_router(hospitals_router, prefix="/hospitals", tags=["Hospitals"])