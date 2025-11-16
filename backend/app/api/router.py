from fastapi import APIRouter
from .endpoints import specialties, doctors, appointments, health_packages, auth

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(specialties.router, prefix="/specialties", tags=["Specialties"])
api_router.include_router(doctors.router, prefix="/doctors", tags=["Doctors"])
api_router.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
api_router.include_router(health_packages.router, prefix="/health-packages", tags=["Health Packages"])