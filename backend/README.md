# Hospital Management API

Professional FastAPI backend with JWT authentication and role-based access control.

## Architecture

```
app/
├── models/          # SQLAlchemy database models
├── schemas/         # Pydantic request/response models
├── services/        # Business logic layer
├── api/endpoints/   # API route handlers
├── auth.py          # JWT authentication & authorization
└── database.py      # Database configuration

main.py              # FastAPI application entry point
requirements.txt     # Python dependencies
```

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
python main.py

# API Documentation
http://localhost:8000/docs
```

## Authentication System

### JWT Token Authentication
- Login returns JWT access token
- Include token in Authorization header
- Token expires in 30 minutes

### Role-Based Access Control

**Doctor/Admin Permissions:**
- Access all patient data
- View all appointments
- Full system access

**Patient Permissions:**
- Access only own profile
- View only own appointments
- Cannot access other patients' data

## API Endpoints

### Public Endpoints
```
GET  /                     # API status
GET  /health              # Health check
GET  /api/v1/specialties  # Medical specialties
GET  /api/v1/doctors      # Doctor listings
GET  /api/v1/health-packages # Health packages
```

### Authentication Endpoints
```
POST /api/v1/auth/register # User registration
POST /api/v1/auth/login    # Login (returns JWT)
GET  /api/v1/auth/me       # Current user info (protected)
POST /api/v1/auth/logout   # Logout
```

### Protected Endpoints
```
GET  /api/v1/appointments     # Get appointments (role-based)
POST /api/v1/appointments     # Book appointment (patients only)
GET  /api/v1/appointments/{id} # Appointment details
POST /api/v1/appointments/{id}/cancel # Cancel appointment
```

## Usage Examples

### 1. Register User
```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "role": "patient"
  }'
```

### 2. Login
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "user": {
    "id": "1",
    "email": "patient@example.com",
    "fullName": "John Doe",
    "role": "patient"
  }
}
```

### 3. Access Protected Endpoint
```bash
curl -X GET "http://localhost:8000/api/v1/appointments" \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Database Models

### User Model
- Base user information
- Role-based permissions
- Authentication data

### Patient Model
- Medical history
- Personal information
- Emergency contacts

### Doctor Model
- Professional credentials
- Specialties and qualifications
- Availability and fees

### Appointment Model
- Patient-doctor bookings
- Status tracking
- Payment information

## Security Features

- **JWT Authentication** - Stateless token-based auth
- **Password Hashing** - SHA256 for demo (use bcrypt in production)
- **Role Validation** - Endpoint-level permission checks
- **Data Isolation** - Users see only authorized data
- **CORS Protection** - Configured for frontend origin

## Environment Configuration

Create `.env` file:
```bash
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/hospital_management_db
FRONTEND_URL=http://localhost:3000
SECRET_KEY=your-jwt-secret-key-change-in-production
```

## Development

### Adding New Endpoints
1. Create model in `app/models/`
2. Add schema in `app/schemas/`
3. Implement service in `app/services/`
4. Create endpoint in `app/api/endpoints/`
5. Add to router in `app/api/router.py`

### Testing Authentication
```python
# Test with different user roles
# Verify role-based access control
# Check data isolation
```

## Production Considerations

- Use bcrypt for password hashing
- Implement refresh tokens
- Add rate limiting
- Use HTTPS only
- Secure JWT secret key
- Database connection pooling
- Logging and monitoring