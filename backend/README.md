# Hospital Management System - Backend API

A production-ready FastAPI backend for a comprehensive hospital management platform.

## 🏗️ Architecture

- **Framework**: FastAPI with async/await support
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with OAuth2
- **Task Queue**: Celery with Redis
- **API Documentation**: Auto-generated Swagger/OpenAPI
- **Security**: Production-grade security headers and validation

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Conda (recommended) or pip

### Installation

1. **Create and activate conda environment**
   ```bash
   conda create -n hospital_backend python=3.11 -y
   conda activate hospital_backend
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start services with Docker**
   ```bash
   docker-compose up -d postgres redis
   ```

5. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

6. **Start the development server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/v1/              # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── patients/       # Patient management
│   │   ├── doctors/        # Doctor management
│   │   ├── appointments/   # Appointment system
│   │   ├── specialities/   # Medical specialties
│   │   └── hospitals/      # Hospital information
│   ├── models/             # Database models
│   ├── schemas/            # Pydantic schemas
│   ├── services/           # Business logic
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── config.py          # Configuration management
│   ├── database.py        # Database connection
│   └── main.py            # FastAPI application
├── migrations/             # Alembic migrations
├── tests/                 # Test suite
├── docker-compose.yml     # Development services
├── Dockerfile            # Production container
└── requirements.txt      # Python dependencies
```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Token refresh
- `GET /api/v1/auth/me` - Current user info

### Patients
- `GET /api/v1/patients/profile` - Get patient profile
- `PUT /api/v1/patients/profile` - Update patient profile
- `GET /api/v1/patients/medical-history` - Medical history

### Doctors
- `GET /api/v1/doctors/` - List doctors with filters
- `GET /api/v1/doctors/{id}` - Get doctor details
- `GET /api/v1/doctors/{id}/availability` - Doctor availability

### Appointments
- `GET /api/v1/appointments/` - List appointments
- `POST /api/v1/appointments/` - Create appointment
- `PUT /api/v1/appointments/{id}` - Update appointment
- `DELETE /api/v1/appointments/{id}` - Cancel appointment

## 🔒 Security Features

- JWT token authentication with refresh tokens
- Password hashing with bcrypt
- Input validation with Pydantic
- SQL injection prevention with SQLAlchemy
- CORS protection
- Rate limiting
- Security headers
- Environment variable validation

## 🗄️ Database Models

### User Model
- Base model for all users (patients, doctors, admin)
- Email and phone verification
- Role-based access control
- Audit trails

### Patient Model
- Personal information
- Medical history
- Insurance details
- Emergency contacts

### Doctor Model
- Professional credentials
- Specializations
- Availability schedules
- Performance metrics

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_auth.py
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose up -d
```

### Production
```bash
docker build -t hospital-backend .
docker run -p 8000:8000 hospital-backend
```

## 📊 Monitoring

- Health check endpoint: `/health`
- API documentation: `/api/docs`
- Metrics endpoint: `/metrics`
- Logging with structured JSON format

## 🔧 Configuration

Key environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT signing key (32+ characters)
- `REDIS_URL`: Redis connection string
- `ENVIRONMENT`: development/production
- `DEBUG`: Enable debug mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.