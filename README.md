# Apex Hospital Management System

🏥 Modern, secure hospital management platform with role-based access control, AI-powered symptom checker, and comprehensive medical services.

## 🚀 Features

- **Role-Based Authentication** - Secure JWT-based auth for patients, doctors, and admins
- **AI Symptom Checker** - Google Gemini-powered symptom analysis
- **Appointment Management** - Complete booking and scheduling system
- **Doctor Profiles** - Comprehensive doctor listings with specialties
- **Health Packages** - Preventive care packages and checkups
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Real-time Updates** - Live appointment status and notifications

## 🏗️ Architecture

```
├── frontend/                    # Next.js 14 + TypeScript
│   ├── src/app/                # App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── doctors/           # Doctor listings & profiles
│   │   ├── appointments/      # Appointment management
│   │   └── symptom-checker/   # AI symptom analysis
│   ├── src/components/        # React components
│   │   ├── auth/             # Authentication forms
│   │   ├── common/           # Shared components
│   │   ├── doctor/           # Doctor-specific components
│   │   └── ui/               # Shadcn/ui components
│   ├── src/lib/              # API client & utilities
│   ├── src/types/            # TypeScript definitions
│   └── src/contexts/         # React contexts
│
├── backend/                     # FastAPI + PostgreSQL
│   ├── app/
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic
│   │   ├── api/endpoints/    # API routes
│   │   ├── auth.py          # JWT authentication
│   │   └── database.py      # Database configuration
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
│
└── docs/                       # Documentation
    ├── DEVELOPER_GUIDE.md     # Development guide
    └── blueprint.md           # Project blueprint
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- Git

### 1. Database Setup
```bash
# Create PostgreSQL database
createdb hospital_management_db

# Import schema (located in backend/)
psql hospital_management_db < backend/hospital_database_schema.sql
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your database credentials

# Run server
python main.py
```

**Backend will be available at:**
- API: http://localhost:8000
- Interactive Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Add your Google Gemini API key for symptom checker

# Run development server
npm run dev
```

**Frontend will be available at:** http://localhost:3000

## 🔐 Authentication & Authorization

### Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **Patient** | View own profile, book appointments, access own medical records |
| **Doctor** | View all patients, manage appointments, access medical records |
| **Admin** | Full system access, user management, analytics |
| **Staff** | Appointment management, basic patient info |

### API Authentication Flow

1. **Register/Login** → Receive JWT token
2. **Include token** in API requests:
   ```bash
   Authorization: Bearer <jwt-token>
   ```
3. **Token expires** → Use refresh token or re-login

## 📚 API Documentation

### Authentication Endpoints
```bash
POST /api/v1/auth/register    # User registration
POST /api/v1/auth/login       # Login (returns JWT)
GET  /api/v1/auth/me          # Current user profile
POST /api/v1/auth/logout      # Logout
POST /api/v1/auth/refresh     # Refresh token
```

### Medical Data Endpoints
```bash
GET  /api/v1/specialties      # Medical specialties
GET  /api/v1/doctors          # Doctor listings
GET  /api/v1/doctors/{id}     # Doctor profile
GET  /api/v1/health-packages  # Health packages
```

### Protected Endpoints (Require Authentication)
```bash
GET  /api/v1/appointments     # Get appointments (role-based)
POST /api/v1/appointments     # Book appointment
GET  /api/v1/appointments/{id} # Appointment details
POST /api/v1/appointments/{id}/cancel # Cancel appointment
```

## 👥 User Registration Examples

### Patient Registration
```json
{
  "email": "patient@example.com",
  "password": "securePassword123",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "role": "patient"
}
```

### Doctor Registration
```json
{
  "email": "doctor@example.com",
  "password": "securePassword123",
  "fullName": "Dr. Sarah Smith",
  "phone": "+1234567890",
  "role": "doctor"
}
```

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Granular permissions system
- **Password Hashing** - Bcrypt password encryption
- **Protected Routes** - Frontend route protection
- **Data Isolation** - Users access only authorized data
- **CORS Configuration** - Secure cross-origin requests
- **Input Validation** - Pydantic schema validation
- **SQL Injection Prevention** - SQLAlchemy ORM protection

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** React Context + Hooks
- **HTTP Client:** Fetch API with custom wrapper
- **AI Integration:** Google Gemini API

### Backend
- **Framework:** FastAPI
- **Language:** Python 3.11+
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Authentication:** JWT (PyJWT)
- **Validation:** Pydantic
- **Documentation:** OpenAPI/Swagger

### DevOps & Deployment
- **Containerization:** Docker
- **Database Migrations:** Alembic
- **Environment Management:** python-dotenv
- **Code Quality:** ESLint, Prettier, Black
- **Version Control:** Git

## 🔧 Development

### Environment Variables

**Backend (.env)**
```bash
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/hospital_management_db
SECRET_KEY=your-super-secret-jwt-key-change-in-production
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend (.env)**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_ENABLE_SYMPTOM_CHECKER=true
```

### Testing the System

1. **Start both servers** (backend on :8000, frontend on :3000)
2. **Register test users** with different roles
3. **Login and test** role-based access
4. **Book appointments** as patient
5. **Manage appointments** as doctor
6. **Try symptom checker** with AI integration

### Development Commands

```bash
# Backend
cd backend
python main.py              # Start development server
pip install -r requirements.txt  # Install dependencies

# Frontend
cd frontend
npm run dev                 # Start development server
npm run build              # Build for production
npm run lint               # Run ESLint
npm run type-check         # TypeScript checking
```

## 📖 Documentation

- **[Developer Guide](DEVELOPER_GUIDE.md)** - Comprehensive development documentation
- **[API Documentation](http://localhost:8000/docs)** - Interactive API docs (when backend is running)
- **[Project Blueprint](docs/blueprint.md)** - Project architecture and design decisions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for beautiful UI components
- **Google Gemini** for AI-powered symptom analysis
- **FastAPI** for the excellent Python web framework
- **Next.js** for the powerful React framework

---

**Built with ❤️ for modern healthcare management**