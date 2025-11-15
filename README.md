# 🏥 Apex Hospital Management System

A comprehensive, production-grade hospital management platform inspired by modern healthcare institutions. Built with cutting-edge technologies for scalability, security, and user experience.

## ✨ Features

### 🎯 Core Features
- **Multi-Specialty Care**: 25+ medical specialties with expert doctors
- **24/7 Emergency Services**: Round-the-clock emergency care
- **Online Appointments**: Easy booking with real-time availability
- **AI Symptom Checker**: Google Gemini-powered health assessment
- **Patient Portal**: Comprehensive medical records management
- **Doctor Discovery**: Advanced search with filters and reviews
- **Health Packages**: Preventive care and wellness programs
- **Telemedicine**: Video consultations and remote care

### 🔒 Security & Compliance
- JWT authentication winth refresh tokens
- HIPAA-compliant data handling
- End-to-end encryption
- Role-based access control
- Audit trails and logging

## 🏗️ Architecture

### Backend (Python FastAPI)
- **Framework**: FastAPI with async/await support
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with OAuth2
- **Task Queue**: Celery with Redis
- **API Documentation**: Auto-generated Swagger/OpenAPI
- **Security**: Production-grade security headers

### Frontend (Next.js)
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **UI**: Shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: Google Gemini for symptom checker
- **Performance**: SSR, SSG, and optimized loading

## 🚀 End-to-End Development Setup

### Prerequisites
- **Python 3.11+** (Conda recommended for environment management)
- **Node.js 18+** with npm/yarn
- **PostgreSQL 15+** (or Docker for local development)
- **Redis 7+** (or Docker for local development)
- **Docker & Docker Compose** (recommended for services)
- **Git** for version control
- **VS Code** with Python, TypeScript, and Tailwind extensions

### 🐍 Backend Development Setup

#### 1. Environment Setup
```bash
# Clone repository
git clone <repository-url>
cd derma_hospital_demo_chennai/backend

# Create virtual environment (Option 1: venv)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Create virtual environment (Option 2: Conda - Recommended)
conda create -n hospital_backend python=3.11
conda activate hospital_backend
```

#### 2. Install Dependencies
```bash
# Install Python packages
pip install -r requirements.txt

# Install development dependencies
pip install pytest black flake8 mypy pre-commit
```

#### 3. Database Setup
```bash
# Option 1: Using Docker (Recommended)
docker-compose up -d postgres redis

# Option 2: Local PostgreSQL
# Install PostgreSQL and create database 'hospital_db'
psql -U postgres -c "CREATE DATABASE hospital_db;"
```

#### 4. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your settings:
# DATABASE_URL=postgresql://user:password@localhost:5432/hospital_db
# REDIS_URL=redis://localhost:6379
# SECRET_KEY=your-secret-key
# GEMINI_API_KEY=your-gemini-api-key
```

#### 5. Database Migration
```bash
# Initialize Alembic (if not done)
alembic init migrations

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head

# Seed initial data (optional)
python scripts/seed_data.py
```

#### 6. Run Backend Server
```bash
# Development server with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production server
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

**Backend URLs:**
- API Server: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc
- Health Check: http://localhost:8000/health

### ⚛️ Frontend Development Setup

#### 1. Environment Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install Node.js dependencies
npm install
# or
yarn install
```

#### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your settings:
# NEXT_PUBLIC_API_URL=http://localhost:8000
# NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
# NEXTAUTH_SECRET=your-nextauth-secret
# NEXTAUTH_URL=http://localhost:3000
```

#### 3. Install UI Components
```bash
# Initialize shadcn/ui (if not done)
npx shadcn-ui@latest init

# Add required components
npx shadcn-ui@latest add button card input label
npx shadcn-ui@latest add dialog dropdown-menu avatar
npx shadcn-ui@latest add calendar date-picker badge
```

#### 4. Run Frontend Server
```bash
# Development server
npm run dev
# or
yarn dev

# Build for production
npm run build
npm start
```

**Frontend URLs:**
- Development Server: http://localhost:3000
- Production Build: http://localhost:3000

### 🔄 Full Stack Development Workflow

#### Daily Development Routine
```bash
# Terminal 1: Backend
cd backend
conda activate hospital_backend
docker-compose up -d postgres redis
uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Testing/Commands
pytest  # Backend tests
npm test  # Frontend tests
```

## 📁 Detailed Project Structure

```
derma_hospital_demo_chennai/
├── backend/                           # Python FastAPI Backend
│   ├── app/
│   │   ├── api/v1/                   # API Version 1
│   │   │   ├── auth/                 # Authentication
│   │   │   │   ├── __init__.py
│   │   │   │   ├── router.py         # Auth routes
│   │   │   │   └── dependencies.py   # Auth dependencies
│   │   │   ├── patients/             # Patient Management
│   │   │   │   ├── __init__.py
│   │   │   │   ├── router.py         # Patient CRUD
│   │   │   │   └── schemas.py        # Patient schemas
│   │   │   ├── doctors/              # Doctor Management
│   │   │   │   ├── __init__.py
│   │   │   │   ├── router.py         # Doctor CRUD
│   │   │   │   └── schemas.py        # Doctor schemas
│   │   │   ├── appointments/         # Appointment System
│   │   │   │   ├── __init__.py
│   │   │   │   ├── router.py         # Booking logic
│   │   │   │   └── schemas.py        # Appointment schemas
│   │   │   ├── specialities/         # Medical Specialties
│   │   │   └── hospitals/            # Hospital Info
│   │   ├── models/                   # SQLAlchemy Models
│   │   │   ├── __init__.py
│   │   │   ├── user.py              # User model
│   │   │   ├── doctor.py            # Doctor model
│   │   │   ├── patient.py           # Patient model
│   │   │   ├── appointment.py       # Appointment model
│   │   │   └── specialty.py         # Specialty model
│   │   ├── schemas/                  # Pydantic Schemas
│   │   │   ├── __init__.py
│   │   │   ├── user.py              # User schemas
│   │   │   ├── doctor.py            # Doctor schemas
│   │   │   └── appointment.py       # Appointment schemas
│   │   ├── services/                 # Business Logic
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py      # Authentication logic
│   │   │   ├── doctor_service.py    # Doctor operations
│   │   │   ├── appointment_service.py # Booking logic
│   │   │   └── ai_service.py        # Gemini AI integration
│   │   ├── middleware/               # Custom Middleware
│   │   │   ├── __init__.py
│   │   │   ├── cors.py              # CORS handling
│   │   │   └── auth.py              # JWT middleware
│   │   ├── utils/                    # Utility Functions
│   │   │   ├── __init__.py
│   │   │   ├── security.py          # Password hashing
│   │   │   ├── email.py             # Email utilities
│   │   │   └── validators.py        # Input validation
│   │   ├── config.py                 # App Configuration
│   │   ├── database.py               # Database Connection
│   │   └── main.py                   # FastAPI App Entry
│   ├── migrations/                   # Alembic Migrations
│   │   ├── versions/                 # Migration files
│   │   ├── alembic.ini              # Alembic config
│   │   └── env.py                   # Migration environment
│   ├── tests/                        # Test Suite
│   │   ├── __init__.py
│   │   ├── conftest.py              # Test configuration
│   │   ├── test_auth.py             # Auth tests
│   │   ├── test_doctors.py          # Doctor tests
│   │   └── test_appointments.py     # Appointment tests
│   ├── scripts/                      # Utility Scripts
│   │   ├── seed_data.py             # Database seeding
│   │   └── backup_db.py             # Database backup
│   ├── docker-compose.yml            # Development Services
│   ├── Dockerfile                    # Production Container
│   ├── requirements.txt              # Python Dependencies
│   ├── .env.example                  # Environment Template
│   └── README.md                     # Backend Documentation
│
├── frontend/                         # Next.js Frontend
│   ├── src/
│   │   ├── app/                     # Next.js App Router
│   │   │   ├── (auth)/              # Auth Route Group
│   │   │   │   ├── login/           # Login page
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register/        # Registration page
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx       # Auth layout
│   │   │   ├── doctors/             # Doctor Discovery
│   │   │   │   ├── page.tsx         # Doctor list
│   │   │   │   ├── [id]/            # Doctor details
│   │   │   │   │   └── page.tsx
│   │   │   │   └── loading.tsx      # Loading component
│   │   │   ├── appointments/        # Appointment Management
│   │   │   │   ├── page.tsx         # Appointment list
│   │   │   │   ├── book/            # Book appointment
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/            # Appointment details
│   │   │   │       └── page.tsx
│   │   │   ├── symptom-checker/     # AI Symptom Checker
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/           # User Dashboard
│   │   │   │   ├── page.tsx         # Dashboard home
│   │   │   │   ├── profile/         # Profile management
│   │   │   │   │   └── page.tsx
│   │   │   │   └── appointments/    # User appointments
│   │   │   │       └── page.tsx
│   │   │   ├── globals.css          # Global styles
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── page.tsx             # Homepage
│   │   │   ├── loading.tsx          # Global loading
│   │   │   └── not-found.tsx        # 404 page
│   │   ├── components/              # React Components
│   │   │   ├── ui/                  # Shadcn/ui Components
│   │   │   │   ├── button.tsx       # Button component
│   │   │   │   ├── card.tsx         # Card component
│   │   │   │   ├── input.tsx        # Input component
│   │   │   │   ├── dialog.tsx       # Modal dialog
│   │   │   │   ├── dropdown-menu.tsx # Dropdown menu
│   │   │   │   ├── avatar.tsx       # Avatar component
│   │   │   │   ├── badge.tsx        # Badge component
│   │   │   │   ├── calendar.tsx     # Calendar picker
│   │   │   │   └── date-picker.tsx  # Date picker
│   │   │   ├── common/              # Shared Components
│   │   │   │   ├── Header.tsx       # Site header
│   │   │   │   ├── Footer.tsx       # Site footer
│   │   │   │   ├── Navigation.tsx   # Navigation menu
│   │   │   │   ├── LoadingSpinner.tsx # Loading spinner
│   │   │   │   └── ErrorBoundary.tsx # Error handling
│   │   │   ├── home/                # Homepage Components
│   │   │   │   ├── HeroSection.tsx  # Hero banner
│   │   │   │   ├── FeaturesSection.tsx # Features showcase
│   │   │   │   ├── SpecialtiesSection.tsx # Medical specialties
│   │   │   │   ├── DoctorsSection.tsx # Featured doctors
│   │   │   │   └── TestimonialsSection.tsx # Patient reviews
│   │   │   ├── doctors/             # Doctor Components
│   │   │   │   ├── DoctorCard.tsx   # Doctor card
│   │   │   │   ├── DoctorList.tsx   # Doctor listing
│   │   │   │   ├── DoctorFilter.tsx # Search filters
│   │   │   │   └── DoctorProfile.tsx # Doctor details
│   │   │   ├── appointments/        # Appointment Components
│   │   │   │   ├── AppointmentForm.tsx # Booking form
│   │   │   │   ├── AppointmentCard.tsx # Appointment card
│   │   │   │   ├── TimeSlotPicker.tsx # Time selection
│   │   │   │   └── AppointmentList.tsx # Appointment list
│   │   │   └── auth/                # Authentication Components
│   │   │       ├── LoginForm.tsx    # Login form
│   │   │       ├── RegisterForm.tsx # Registration form
│   │   │       └── AuthGuard.tsx    # Route protection
│   │   ├── contexts/                # React Contexts
│   │   │   ├── AuthContext.tsx      # Authentication state
│   │   │   ├── ThemeContext.tsx     # Theme management
│   │   │   └── AppointmentContext.tsx # Appointment state
│   │   ├── hooks/                   # Custom Hooks
│   │   │   ├── useAuth.ts           # Authentication hook
│   │   │   ├── useApi.ts            # API calling hook
│   │   │   ├── useLocalStorage.ts   # Local storage hook
│   │   │   └── useDebounce.ts       # Debounce hook
│   │   ├── lib/                     # Utilities & Config
│   │   │   ├── api.ts               # API client
│   │   │   ├── auth.ts              # Auth utilities
│   │   │   ├── utils.ts             # General utilities
│   │   │   ├── validations.ts       # Form validations
│   │   │   └── constants.ts         # App constants
│   │   ├── ai/                      # AI Integration
│   │   │   ├── gemini.ts            # Gemini AI client
│   │   │   ├── symptom-checker.ts   # Symptom analysis
│   │   │   └── types.ts             # AI types
│   │   ├── types/                   # TypeScript Types
│   │   │   ├── auth.ts              # Auth types
│   │   │   ├── doctor.ts            # Doctor types
│   │   │   ├── appointment.ts       # Appointment types
│   │   │   └── api.ts               # API response types
│   │   └── middleware.ts            # Next.js Middleware
│   ├── public/                      # Static Assets
│   │   ├── images/                  # Image assets
│   │   ├── icons/                   # Icon files
│   │   ├── favicon.ico              # Site favicon
│   │   └── manifest.json            # PWA manifest
│   ├── components.json              # Shadcn/ui Config
│   ├── tailwind.config.ts           # Tailwind CSS Config
│   ├── next.config.ts               # Next.js Config
│   ├── tsconfig.json                # TypeScript Config
│   ├── package.json                 # Dependencies
│   ├── .env.example                 # Environment Template
│   └── README.md                    # Frontend Documentation
│
├── docs/                            # Project Documentation
│   ├── api/                         # API Documentation
│   ├── deployment/                  # Deployment Guides
│   ├── development/                 # Development Guides
│   └── architecture/                # System Architecture
├── .gitignore                       # Git Ignore Rules
├── docker-compose.yml               # Full Stack Docker
└── README.md                        # Main Documentation
```

## 🧩 Component Library & UI System

### Shadcn/ui Components Used
```bash
# Core UI Components
npx shadcn-ui@latest add button        # Primary/secondary buttons
npx shadcn-ui@latest add card          # Content cards
npx shadcn-ui@latest add input         # Form inputs
npx shadcn-ui@latest add label         # Form labels
npx shadcn-ui@latest add textarea      # Text areas
npx shadcn-ui@latest add select        # Dropdown selects

# Navigation & Layout
npx shadcn-ui@latest add navigation-menu # Main navigation
npx shadcn-ui@latest add breadcrumb     # Breadcrumb navigation
npx shadcn-ui@latest add separator      # Visual separators

# Interactive Components
npx shadcn-ui@latest add dialog         # Modal dialogs
npx shadcn-ui@latest add dropdown-menu  # Context menus
npx shadcn-ui@latest add popover        # Tooltip popovers
npx shadcn-ui@latest add sheet          # Side panels

# Data Display
npx shadcn-ui@latest add table          # Data tables
npx shadcn-ui@latest add badge          # Status badges
npx shadcn-ui@latest add avatar         # User avatars
npx shadcn-ui@latest add progress       # Progress bars

# Date & Time
npx shadcn-ui@latest add calendar       # Date picker
npx shadcn-ui@latest add date-picker    # Date selection

# Feedback
npx shadcn-ui@latest add alert          # Alert messages
npx shadcn-ui@latest add toast          # Toast notifications
npx shadcn-ui@latest add skeleton       # Loading skeletons
```

### Custom Components Structure
```typescript
// components/common/Header.tsx
export interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

// components/doctors/DoctorCard.tsx
export interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment?: (doctorId: string) => void;
  showBookingButton?: boolean;
}

// components/appointments/AppointmentForm.tsx
export interface AppointmentFormProps {
  doctorId: string;
  availableSlots: TimeSlot[];
  onSubmit: (data: AppointmentData) => void;
}
```

### Tailwind CSS Custom Classes
```css
/* globals.css - Custom utility classes */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors;
}

.card-hover {
  @apply hover:shadow-lg transition-shadow duration-200;
}

.text-gradient {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
}
```

## 🌟 Detailed Features

### 👥 User Management
- **Multi-Role Authentication**: Patients, Doctors, Admin, Staff
- **Secure Registration**: Email/phone verification
- **Profile Management**: Comprehensive user profiles
- **Access Control**: Role-based permissions

### 🏥 Hospital Operations
- **Multi-Specialty Support**: 25+ medical specialties
- **Doctor Profiles**: Detailed credentials and experience
- **Appointment System**: Real-time booking and scheduling
- **Emergency Services**: 24/7 emergency contact and services
- **Health Packages**: Preventive care programs

### 🤖 AI & Technology
- **Symptom Checker**: Google Gemini-powered health assessment
- **Smart Search**: Intelligent doctor and service discovery
- **Predictive Analytics**: Health trend analysis
- **Automated Reminders**: Appointment and medication alerts

### 💳 Payment & Billing
- **Multiple Gateways**: Razorpay, Stripe integration
- **Insurance Support**: Claims processing
- **Transparent Pricing**: Clear cost breakdown
- **Payment History**: Detailed transaction records

### 📱 User Experience
- **Responsive Design**: Mobile-first approach
- **Progressive Web App**: App-like experience
- **Offline Support**: Basic functionality without internet
- **Accessibility**: WCAG 2.1 AA compliant

## 🚀 Production Deployment Guide

### Docker Deployment (Recommended)

#### Full Stack Docker Compose
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: hospital_db
      POSTGRES_USER: hospital_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      - DATABASE_URL=postgresql://hospital_user:secure_password@postgres:5432/hospital_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    ports:
      - "8000:8000"

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend
    ports:
      - "3000:3000"

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend
    ports:
      - "80:80"
      - "443:443"

volumes:
  postgres_data:
```

#### Backend Dockerfile
```dockerfile
# backend/Dockerfile.prod
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Run application
CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

#### Frontend Dockerfile
```dockerfile
# frontend/Dockerfile.prod
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Cloud Deployment Options

#### AWS Deployment
```bash
# Using AWS ECS with Fargate
# 1. Build and push Docker images to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

docker build -t hospital-backend ./backend
docker tag hospital-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-backend:latest

# 2. Create ECS task definition
# 3. Create ECS service
# 4. Configure Application Load Balancer
# 5. Set up RDS PostgreSQL instance
# 6. Configure ElastiCache Redis
```

#### Vercel Deployment (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel --prod

# Environment variables in Vercel dashboard:
# NEXT_PUBLIC_API_URL=https://your-backend-url.com
# NEXTAUTH_SECRET=your-secret
# NEXTAUTH_URL=https://your-frontend-url.vercel.app
```

#### Railway Deployment (Backend)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up

# Add environment variables in Railway dashboard
```

### Environment-Specific Configurations

#### Production Environment Variables
```bash
# Backend Production (.env.prod)
ENVIRONMENT=production
DEBUG=false
DATABASE_URL=postgresql://user:pass@prod-db:5432/hospital_db
REDIS_URL=redis://prod-redis:6379
SECRET_KEY=super-secure-production-key
CORS_ORIGINS=["https://yourdomain.com"]
SENTRY_DSN=https://your-sentry-dsn

# Frontend Production (.env.production)
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn
```

## 📚 Complete API Documentation

### Authentication Endpoints (`/api/v1/auth/`)

#### POST `/api/v1/auth/register`
```json
// Request Body
{
  "email": "user@example.com",
  "password": "securePassword123",
  "full_name": "John Doe",
  "phone": "+1234567890",
  "role": "patient" // or "doctor"
}

// Response
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "patient"
  }
}
```

#### POST `/api/v1/auth/login`
```json
// Request Body
{
  "email": "user@example.com",
  "password": "securePassword123"
}

// Response (same as register)
```

#### POST `/api/v1/auth/refresh`
```json
// Request Body
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}

// Response
{
  "access_token": "new_access_token",
  "token_type": "bearer"
}
```

#### GET `/api/v1/auth/me`
```json
// Headers: Authorization: Bearer <access_token>
// Response
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "phone": "+1234567890",
  "role": "patient",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Doctor Endpoints (`/api/v1/doctors/`)

#### GET `/api/v1/doctors/`
```json
// Query Parameters
// ?specialty=cardiology&location=chennai&available_today=true&limit=10&offset=0

// Response
{
  "doctors": [
    {
      "id": "uuid",
      "full_name": "Dr. Smith",
      "specialty": "Cardiology",
      "experience_years": 15,
      "rating": 4.8,
      "consultation_fee": 500,
      "location": "Chennai",
      "available_today": true,
      "profile_image": "url",
      "qualifications": ["MBBS", "MD"]
    }
  ],
  "total": 25,
  "page": 1,
  "pages": 3
}
```

#### GET `/api/v1/doctors/{doctor_id}`
```json
// Response
{
  "id": "uuid",
  "full_name": "Dr. Smith",
  "specialty": "Cardiology",
  "experience_years": 15,
  "rating": 4.8,
  "consultation_fee": 500,
  "location": "Chennai",
  "bio": "Experienced cardiologist...",
  "qualifications": ["MBBS", "MD", "DM Cardiology"],
  "languages": ["English", "Tamil", "Hindi"],
  "working_hours": {
    "monday": "09:00-17:00",
    "tuesday": "09:00-17:00"
  },
  "reviews": [
    {
      "patient_name": "Anonymous",
      "rating": 5,
      "comment": "Excellent doctor",
      "date": "2024-01-01"
    }
  ]
}
```

#### GET `/api/v1/doctors/{doctor_id}/availability`
```json
// Query: ?date=2024-01-15
// Response
{
  "date": "2024-01-15",
  "available_slots": [
    {
      "time": "09:00",
      "available": true
    },
    {
      "time": "09:30",
      "available": false
    },
    {
      "time": "10:00",
      "available": true
    }
  ]
}
```

### Appointment Endpoints (`/api/v1/appointments/`)

#### POST `/api/v1/appointments/`
```json
// Request Body
{
  "doctor_id": "uuid",
  "appointment_date": "2024-01-15",
  "appointment_time": "10:00",
  "reason": "Regular checkup",
  "patient_notes": "Having chest pain"
}

// Response
{
  "id": "uuid",
  "doctor": {
    "id": "uuid",
    "full_name": "Dr. Smith",
    "specialty": "Cardiology"
  },
  "patient": {
    "id": "uuid",
    "full_name": "John Doe"
  },
  "appointment_date": "2024-01-15",
  "appointment_time": "10:00",
  "status": "confirmed",
  "reason": "Regular checkup",
  "consultation_fee": 500,
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### GET `/api/v1/appointments/`
```json
// Query: ?status=confirmed&date_from=2024-01-01&date_to=2024-01-31
// Response
{
  "appointments": [
    {
      "id": "uuid",
      "doctor": {
        "full_name": "Dr. Smith",
        "specialty": "Cardiology"
      },
      "appointment_date": "2024-01-15",
      "appointment_time": "10:00",
      "status": "confirmed",
      "reason": "Regular checkup"
    }
  ],
  "total": 5
}
```

### Specialty Endpoints (`/api/v1/specialties/`)

#### GET `/api/v1/specialties/`
```json
// Response
{
  "specialties": [
    {
      "id": "uuid",
      "name": "Cardiology",
      "description": "Heart and cardiovascular system",
      "icon": "heart-icon.svg",
      "doctor_count": 25
    },
    {
      "id": "uuid",
      "name": "Dermatology",
      "description": "Skin, hair, and nail conditions",
      "icon": "skin-icon.svg",
      "doctor_count": 18
    }
  ]
}
```

### AI Symptom Checker (`/api/v1/ai/`)

#### POST `/api/v1/ai/symptom-check`
```json
// Request Body
{
  "symptoms": ["headache", "fever", "nausea"],
  "age": 30,
  "gender": "male",
  "duration": "2 days"
}

// Response
{
  "analysis": {
    "possible_conditions": [
      {
        "condition": "Viral Infection",
        "probability": 0.7,
        "description": "Common viral infection symptoms"
      },
      {
        "condition": "Migraine",
        "probability": 0.3,
        "description": "Tension headache with nausea"
      }
    ],
    "recommendations": [
      "Rest and stay hydrated",
      "Monitor temperature",
      "Consult doctor if symptoms worsen"
    ],
    "urgency_level": "low", // low, medium, high, emergency
    "suggested_specialties": ["General Medicine", "Internal Medicine"]
  }
}
```

### Error Responses
```json
// 400 Bad Request
{
  "detail": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}

// 401 Unauthorized
{
  "detail": "Invalid authentication credentials"
}

// 404 Not Found
{
  "detail": "Resource not found"
}

// 500 Internal Server Error
{
  "detail": "Internal server error",
  "error_id": "uuid"
}
```ls
- `GET /{id}/doctors` - Hospital doctors

### API Testing & Documentation
- **Swagger UI**: http://localhost:8000/docs (Interactive API testing)
- **ReDoc**: http://localhost:8000/redoc (Clean API documentation)
- **OpenAPI Schema**: http://localhost:8000/openapi.json (Machine-readable spec)
- **Postman Collection**: Available in `/docs/api/postman_collection.json`

## 🔧 Developer Tools & Workflow

### Backend Development Tools
```bash
# Code Formatting
black app/                    # Format Python code
flake8 app/                   # Lint Python code
mypy app/                     # Type checking

# Testing
pytest                        # Run all tests
pytest --cov=app             # Run with coverage
pytest -v tests/test_auth.py # Run specific tests

# Database Operations
alembic revision --autogenerate -m "Add new table"  # Create migration
alembic upgrade head          # Apply migrations
alembic downgrade -1          # Rollback migration

# Development Server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development Tools
```bash
# Development
npm run dev                   # Start dev server
npm run build                 # Build for production
npm run start                 # Start production server
npm run lint                  # ESLint checking
npm run lint:fix              # Fix ESLint issues

# Testing
npm test                      # Run unit tests
npm run test:watch            # Watch mode testing
npm run test:coverage         # Coverage report
npm run test:e2e              # End-to-end tests

# Component Development
npm run storybook             # Start Storybook
npm run build-storybook       # Build Storybook

# Type Checking
npm run type-check            # TypeScript checking
```

### Git Workflow
```bash
# Feature Development
git checkout -b feature/appointment-booking
git add .
git commit -m "feat: add appointment booking functionality"
git push origin feature/appointment-booking

# Code Review Process
# 1. Create Pull Request
# 2. Run automated tests
# 3. Code review by team
# 4. Merge to main branch
```

### Environment Variables

#### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/hospital_db
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-super-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# AI Integration
GEMINI_API_KEY=your-gemini-api-key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# File Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_BUCKET_NAME=hospital-files

# Environment
ENVIRONMENT=development  # development, staging, production
DEBUG=true
```

#### Frontend (.env.local)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# AI Integration
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_SYMPTOM_CHECKER=true
NEXT_PUBLIC_ENABLE_TELEMEDICINE=false
```

### Database Schema Overview
```sql
-- Users table (base for patients and doctors)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL, -- 'patient', 'doctor', 'admin'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors table (extends users)
CREATE TABLE doctors (
    id UUID PRIMARY KEY REFERENCES users(id),
    specialty_id UUID REFERENCES specialties(id),
    experience_years INTEGER,
    consultation_fee DECIMAL(10,2),
    bio TEXT,
    qualifications TEXT[],
    languages TEXT[],
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0
);

-- Appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES users(id),
    doctor_id UUID REFERENCES doctors(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
    reason TEXT,
    patient_notes TEXT,
    doctor_notes TEXT,
    consultation_fee DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Performance Optimization

#### Backend Optimizations
```python
# Database Query Optimization
from sqlalchemy.orm import selectinload

# Eager loading to avoid N+1 queries
doctors = session.query(Doctor).options(
    selectinload(Doctor.specialty),
    selectinload(Doctor.reviews)
).all()

# Redis Caching
from redis import Redis
redis_client = Redis(host='localhost', port=6379, db=0)

# Cache frequently accessed data
def get_doctors_by_specialty(specialty_id: str):
    cache_key = f"doctors:specialty:{specialty_id}"
    cached_result = redis_client.get(cache_key)
    
    if cached_result:
        return json.loads(cached_result)
    
    doctors = fetch_doctors_from_db(specialty_id)
    redis_client.setex(cache_key, 300, json.dumps(doctors))  # 5 min cache
    return doctors
```

#### Frontend Optimizations
```typescript
// React Query for API state management
import { useQuery } from '@tanstack/react-query';

function DoctorList() {
  const { data: doctors, isLoading } = useQuery({
    queryKey: ['doctors', filters],
    queryFn: () => fetchDoctors(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div>
      {isLoading ? <DoctorSkeleton /> : <DoctorGrid doctors={doctors} />}
    </div>
  );
}

// Image Optimization
import Image from 'next/image';

<Image
  src={doctor.profileImage}
  alt={doctor.name}
  width={200}
  height={200}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>
```

### Security Best Practices

#### Backend Security
```python
# Password Hashing
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Input Validation
from pydantic import BaseModel, EmailStr, validator

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        return v

# Rate Limiting
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/v1/auth/login")
@limiter.limit("5/minute")
async def login(request: Request, user_data: UserLogin):
    # Login logic
    pass
```

#### Frontend Security
```typescript
// XSS Prevention
import DOMPurify from 'dompurify';

function sanitizeHTML(html: string) {
  return DOMPurify.sanitize(html);
}

// CSRF Protection
import { getCsrfToken } from 'next-auth/react';

const csrfToken = await getCsrfToken();

// Secure API Calls
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🧪 Comprehensive Testing Strategy

### Backend Testing
```bash
# Unit Tests
pytest tests/unit/                    # Unit tests only
pytest tests/unit/test_auth.py       # Specific unit test

# Integration Tests
pytest tests/integration/            # Integration tests
pytest tests/integration/test_api.py # API integration tests

# End-to-End Tests
pytest tests/e2e/                    # E2E tests

# Coverage Reports
pytest --cov=app --cov-report=html   # HTML coverage report
pytest --cov=app --cov-report=term   # Terminal coverage

# Performance Tests
pytest tests/performance/            # Load testing
```

#### Test Structure
```python
# tests/conftest.py - Test Configuration
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import get_db
from tests.utils import override_get_db

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def auth_headers(client):
    # Create test user and return auth headers
    response = client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "testpassword"
    })
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

# tests/test_auth.py - Authentication Tests
def test_user_registration(client):
    response = client.post("/api/v1/auth/register", json={
        "email": "newuser@example.com",
        "password": "securepassword",
        "full_name": "New User",
        "role": "patient"
    })
    assert response.status_code == 201
    assert "access_token" in response.json()

def test_user_login(client):
    response = client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "testpassword"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_protected_route(client, auth_headers):
    response = client.get("/api/v1/auth/me", headers=auth_headers)
    assert response.status_code == 200
    assert "email" in response.json()
```

### Frontend Testing
```bash
# Unit Tests (Jest + React Testing Library)
npm test                              # Run all tests
npm test -- --watch                   # Watch mode
npm test -- --coverage                # With coverage
npm test DoctorCard                   # Test specific component

# E2E Tests (Playwright)
npm run test:e2e                     # Run E2E tests
npm run test:e2e -- --headed         # Run with browser UI
npm run test:e2e -- --debug          # Debug mode

# Component Testing (Storybook)
npm run storybook                     # Start Storybook
npm run test-storybook               # Test stories
```

#### Frontend Test Examples
```typescript
// __tests__/components/DoctorCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { DoctorCard } from '@/components/doctors/DoctorCard';

const mockDoctor = {
  id: '1',
  full_name: 'Dr. John Smith',
  specialty: 'Cardiology',
  rating: 4.8,
  consultation_fee: 500,
  experience_years: 15
};

describe('DoctorCard', () => {
  it('renders doctor information correctly', () => {
    render(<DoctorCard doctor={mockDoctor} />);
    
    expect(screen.getByText('Dr. John Smith')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('₹500')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('calls onBookAppointment when book button is clicked', () => {
    const mockOnBook = jest.fn();
    render(
      <DoctorCard 
        doctor={mockDoctor} 
        onBookAppointment={mockOnBook}
        showBookingButton={true}
      />
    );
    
    fireEvent.click(screen.getByText('Book Appointment'));
    expect(mockOnBook).toHaveBeenCalledWith('1');
  });
});

// e2e/appointment-booking.spec.ts (Playwright)
import { test, expect } from '@playwright/test';

test('user can book an appointment', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="password"]', 'password');
  await page.click('[data-testid="login-button"]');

  // Navigate to doctors
  await page.goto('/doctors');
  await expect(page.locator('[data-testid="doctor-card"]').first()).toBeVisible();

  // Book appointment
  await page.click('[data-testid="book-appointment"]');
  await page.selectOption('[data-testid="date-select"]', '2024-01-15');
  await page.selectOption('[data-testid="time-select"]', '10:00');
  await page.fill('[data-testid="reason"]', 'Regular checkup');
  await page.click('[data-testid="confirm-booking"]');

  // Verify success
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

## 🛠️ Troubleshooting Guide

### Common Backend Issues

#### Database Connection Issues
```bash
# Check PostgreSQL connection
psql -h localhost -U postgres -d hospital_db

# Check if database exists
\l

# Check tables
\dt

# Reset database (development only)
dropdb hospital_db
createdb hospital_db
alembic upgrade head
```

#### Migration Issues
```bash
# Check migration status
alembic current
alembic history

# Fix migration conflicts
alembic merge heads

# Reset migrations (development only)
rm -rf migrations/versions/*
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

#### Redis Connection Issues
```bash
# Test Redis connection
redis-cli ping

# Check Redis logs
docker logs redis-container

# Clear Redis cache
redis-cli FLUSHALL
```

### Common Frontend Issues

#### Build Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

#### API Connection Issues
```typescript
// Debug API calls
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Add request/response interceptors for debugging
apiClient.interceptors.request.use((config) => {
  console.log('API Request:', config);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

## 📚 Additional Resources

### Learning Resources
- **FastAPI Documentation**: https://fastapi.tiangolo.com/
- **Next.js Documentation**: https://nextjs.org/docs
- **Shadcn/ui Components**: https://ui.shadcn.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **PostgreSQL Tutorial**: https://www.postgresql.org/docs/
- **Redis Documentation**: https://redis.io/documentation

### Development Tools
- **VS Code Extensions**:
  - Python
  - TypeScript and JavaScript
  - Tailwind CSS IntelliSense
  - GitLens
  - Thunder Client (API testing)
  - Docker
  - PostgreSQL

### API Testing Tools
- **Postman**: GUI-based API testing
- **Thunder Client**: VS Code extension
- **curl**: Command-line testing
- **httpie**: User-friendly HTTP client

### Database Tools
- **pgAdmin**: PostgreSQL administration
- **DBeaver**: Universal database tool
- **Redis Commander**: Redis GUI
- **TablePlus**: Modern database client

### Monitoring Tools
- **Sentry**: Error tracking
- **DataDog**: Application monitoring
- **New Relic**: Performance monitoring
- **Grafana**: Metrics visualization

## 🤝 Contributing Guidelines

### Code Style
- **Backend**: Follow PEP 8, use Black formatter
- **Frontend**: Follow Airbnb style guide, use Prettier
- **Commits**: Use conventional commit messages
- **Documentation**: Update README for new features

### Pull Request Process
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and add tests
4. Run linting and tests: `npm run lint && npm test`
5. Commit changes: `git commit -m 'feat: add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Create Pull Request with detailed description

### Code Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance impact considered
- [ ] Backward compatibility maintained

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- 📖 **Documentation**: Check this README and `/docs` directory
- 🐛 **Bug Reports**: Create GitHub issues with detailed reproduction steps
- 💡 **Feature Requests**: Use GitHub discussions
- 📧 **Contact**: Reach out for enterprise support

### Community
- **GitHub Discussions**: Ask questions and share ideas
- **Discord Server**: Real-time community chat (if available)
- **Stack Overflow**: Tag questions with `apex-hospital-management`

---

**Built with ❤️ for better healthcare management**

*Last updated: January 2024*

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow coding standards
4. **Add tests**: Ensure good test coverage
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Submit a pull request**: Describe your changes

### Development Guidelines
- Follow existing code style and patterns
- Write comprehensive tests for new features
- Update documentation for API changes
- Use meaningful commit messages
- Keep pull requests focused and small

## 📊 Performance Benchmarks

### Target Performance Metrics
- **API Response Time**: < 100ms (95th percentile)
- **Database Query Time**: < 50ms average
- **Frontend Load Time**: < 2s (First Contentful Paint)
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals**: All metrics in "Good" range

### Performance Monitoring
```python
# API response time monitoring
import time
from functools import wraps

def monitor_performance(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        start_time = time.time()
        result = await func(*args, **kwargs)
        end_time = time.time()
        
        execution_time = (end_time - start_time) * 1000  # Convert to ms
        
        # Log slow queries
        if execution_time > 100:
            logger.warning(f"Slow endpoint: {func.__name__} took {execution_time:.2f}ms")
        
        # Send metrics to monitoring service
        metrics.histogram('api.response_time', execution_time, 
                         tags=[f'endpoint:{func.__name__}'])
        
        return result
    return wrapper

# Usage
@app.get("/api/v1/doctors/")
@monitor_performance
async def get_doctors():
    return doctors
```

### Database Performance
```sql
-- Performance monitoring queries
-- Check slow queries
SELECT query, mean_time, calls, total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Check index usage
SELECT schemaname, tablename, attname, n_distinct, correlation
FROM pg_stats
WHERE tablename = 'doctors';

-- Monitor connection pool
SELECT state, count(*)
FROM pg_stat_activity
GROUP BY state;
```

## 🔒 Security Implementation

### Authentication & Authorization
```python
# JWT Token Implementation
from jose import JWTError, jwt
from datetime import datetime, timedelta

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Role-based access control
from enum import Enum
from functools import wraps

class UserRole(str, Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"
    STAFF = "staff"

def require_role(required_role: UserRole):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            current_user = get_current_user()  # From JWT token
            if current_user.role != required_role:
                raise HTTPException(
                    status_code=403, 
                    detail="Insufficient permissions"
                )
            return await func(*args, **kwargs)
        return wrapper
    return decorator

# Usage
@app.get("/api/v1/admin/users")
@require_role(UserRole.ADMIN)
async def get_all_users():
    return users
```

### Data Protection
```python
# Password hashing
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Data encryption for sensitive fields
from cryptography.fernet import Fernet

class EncryptedField:
    def __init__(self, key: bytes):
        self.cipher_suite = Fernet(key)
    
    def encrypt(self, data: str) -> str:
        return self.cipher_suite.encrypt(data.encode()).decode()
    
    def decrypt(self, encrypted_data: str) -> str:
        return self.cipher_suite.decrypt(encrypted_data.encode()).decode()

# Usage for sensitive medical data
encryption = EncryptedField(ENCRYPTION_KEY)
encrypted_medical_notes = encryption.encrypt(patient_notes)
```

### Input Validation & Sanitization
```python
# Pydantic models with validation
from pydantic import BaseModel, validator, EmailStr
import re

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r'\d', v):
            raise ValueError('Password must contain at least one digit')
        return v
    
    @validator('phone')
    def validate_phone(cls, v):
        phone_pattern = r'^\+?1?\d{9,15}$'
        if not re.match(phone_pattern, v):
            raise ValueError('Invalid phone number format')
        return v
    
    @validator('full_name')
    def validate_name(cls, v):
        if len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters long')
        if not re.match(r'^[a-zA-Z\s]+$', v):
            raise ValueError('Name can only contain letters and spaces')
        return v.strip()
```

### Security Headers & CORS
```python
# Security middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # Specific domains only
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Trusted hosts
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["yourdomain.com", "*.yourdomain.com"]
)

# Security headers
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    return response
```

### Audit Logging
```python
# Audit logging system
import logging
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Text

class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, nullable=True)
    action = Column(String, nullable=False)
    resource = Column(String, nullable=False)
    resource_id = Column(String, nullable=True)
    details = Column(Text, nullable=True)
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

def log_user_action(user_id: str, action: str, resource: str, 
                   resource_id: str = None, details: str = None,
                   request: Request = None):
    audit_log = AuditLog(
        user_id=user_id,
        action=action,
        resource=resource,
        resource_id=resource_id,
        details=details,
        ip_address=request.client.host if request else None,
        user_agent=request.headers.get("user-agent") if request else None
    )
    db.add(audit_log)
    db.commit()

# Usage in endpoints
@app.post("/api/v1/appointments/")
async def create_appointment(appointment_data: AppointmentCreate, 
                           current_user: User = Depends(get_current_user),
                           request: Request = None):
    appointment = create_appointment_service(appointment_data, current_user.id)
    
    # Log the action
    log_user_action(
        user_id=current_user.id,
        action="CREATE",
        resource="appointment",
        resource_id=appointment.id,
        details=f"Appointment booked with Dr. {appointment.doctor.full_name}",
        request=request
    )
    
    return appointment
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Documentation

### Getting Help
- 📖 **Documentation**: Check `/docs` directory
- 🐛 **Issues**: Create GitHub issues for bugs
- 💡 **Features**: Request features via GitHub discussions
- 📧 **Contact**: Reach out for enterprise support

### Resources
- **API Documentation**: `/api/docs` (when backend is running)
- **Frontend Storybook**: Component documentation
- **Database Schema**: ERD diagrams in `/docs`
- **Deployment Guides**: Step-by-step deployment instructions

---

**Built with ❤️ for better healthcare management**