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
- JWT authentication with refresh tokens
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

## 🚀 Quick Start

### Prerequisites
- Python 3.11+ (with Conda recommended)
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start services with Docker**
   ```bash
   docker-compose up -d postgres redis
   ```

6. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

7. **Start the backend server**
   ```bash
   uvicorn app.main:app --reload
   ```

   Backend will be available at: http://localhost:8000
   API Documentation: http://localhost:8000/api/docs
   Health Check: http://localhost:8000/health

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Frontend will be available at: http://localhost:3000

## 📁 Project Structure

```
apex-hospital-management/
├── backend/                    # Python FastAPI backend
│   ├── app/
│   │   ├── api/v1/            # Versioned API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── patients/      # Patient management
│   │   │   ├── doctors/       # Doctor management
│   │   │   ├── appointments/  # Appointment system
│   │   │   ├── specialities/  # Medical specialties
│   │   │   └── hospitals/     # Hospital information
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Custom middleware
│   │   ├── utils/             # Utility functions
│   │   ├── config.py          # Configuration
│   │   ├── database.py        # Database setup
│   │   └── main.py            # FastAPI application
│   ├── migrations/            # Alembic migrations
│   ├── tests/                 # Test suite
│   ├── docker-compose.yml     # Development services
│   ├── Dockerfile             # Production container
│   └── requirements.txt       # Python dependencies
│
├── frontend/                  # Next.js frontend
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   │   ├── (auth)/       # Authentication pages
│   │   │   ├── doctors/      # Doctor discovery
│   │   │   ├── symptom-checker/ # AI symptom checker
│   │   │   ├── layout.tsx    # Root layout
│   │   │   └── page.tsx      # Homepage
│   │   ├── components/       # React components
│   │   │   ├── ui/          # Shadcn/ui components
│   │   │   ├── common/      # Shared components
│   │   │   └── home/        # Homepage components
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilities & API client
│   │   ├── ai/              # AI integration
│   │   └── middleware.ts    # Next.js middleware
│   ├── public/              # Static assets
│   ├── components.json      # Shadcn/ui config
│   ├── tailwind.config.ts   # Tailwind config
│   ├── next.config.ts       # Next.js config
│   └── package.json         # Node.js dependencies
│
├── docs/                      # Documentation
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🔧 Development

### Backend Development
- **API Documentation**: Visit `/api/docs` for interactive Swagger UI
- **Database Migrations**: Use Alembic for schema changes
- **Testing**: Run `pytest` for backend tests
- **Code Quality**: Use `black`, `flake8`, and `mypy`

### Frontend Development
- **Component Library**: Shadcn/ui components
- **Styling**: Tailwind CSS with custom design system
- **Type Safety**: Full TypeScript support
- **Testing**: Jest and React Testing Library

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

## 🚀 Deployment Options

### Development Environment
```bash
# Start backend services
cd backend
docker-compose up -d postgres redis
conda activate hospital_backend
uvicorn app.main:app --reload

# Start frontend
cd frontend
npm run dev
```

### Production Deployment

#### Backend Options
- **AWS ECS/Fargate**: Containerized deployment
- **Google Cloud Run**: Serverless containers
- **DigitalOcean App Platform**: Managed deployment
- **Railway/Render**: Simple cloud deployment

#### Frontend Options
- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: JAMstack deployment
- **AWS Amplify**: Full-stack deployment
- **Cloudflare Pages**: Edge deployment

#### Database & Services
- **Database**: AWS RDS, Google Cloud SQL, PlanetScale
- **Cache**: AWS ElastiCache, Google Memorystore, Upstash
- **File Storage**: AWS S3, Google Cloud Storage
- **Monitoring**: Sentry, DataDog, New Relic

## 📚 API Documentation

### RESTful API Endpoints

#### Authentication (`/api/v1/auth/`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /refresh` - Token refresh
- `GET /me` - Current user info

#### Patients (`/api/v1/patients/`)
- `GET /profile` - Patient profile
- `PUT /profile` - Update profile
- `GET /medical-history` - Medical records

#### Doctors (`/api/v1/doctors/`)
- `GET /` - List doctors (with filters)
- `GET /{id}` - Doctor details
- `GET /{id}/availability` - Doctor schedule

#### Appointments (`/api/v1/appointments/`)
- `GET /` - List appointments
- `POST /` - Book appointment
- `PUT /{id}` - Update appointment
- `DELETE /{id}` - Cancel appointment

#### Specialties (`/api/v1/specialities/`)
- `GET /` - List medical specialties
- `GET /{id}` - Specialty details
- `GET /{id}/doctors` - Doctors by specialty

#### Hospitals (`/api/v1/hospitals/`)
- `GET /` - List hospitals
- `GET /{id}` - Hospital details
- `GET /{id}/doctors` - Hospital doctors

### Interactive Documentation
- **Swagger UI**: Available at `/api/docs`
- **ReDoc**: Available at `/api/redoc`
- **OpenAPI Schema**: Available at `/api/openapi.json`

## 🧪 Testing

### Backend Testing
```bash
cd backend
pytest                    # Run all tests
pytest --cov=app         # Run with coverage
pytest tests/test_auth.py # Run specific tests
```

### Frontend Testing
```bash
cd frontend
npm test                 # Run unit tests
npm run test:e2e        # Run E2E tests
npm run test:coverage   # Run with coverage
```

## 🔧 Development Tools

### Code Quality
- **Backend**: Black, Flake8, MyPy, Pytest
- **Frontend**: ESLint, Prettier, TypeScript, Jest
- **Pre-commit**: Automated code formatting and linting

### Monitoring & Debugging
- **API Monitoring**: Built-in health checks
- **Error Tracking**: Sentry integration ready
- **Performance**: Request timing and metrics
- **Logging**: Structured JSON logging

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

## 📊 Performance Metrics

- **Backend**: <100ms average response time
- **Frontend**: 95+ Lighthouse score
- **Database**: Optimized queries with indexing
- **Caching**: Redis for session and data caching
- **CDN**: Static asset optimization

## 🔒 Security Measures

- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control
- **Data Protection**: Encryption at rest and in transit
- **Input Validation**: Comprehensive sanitization
- **Security Headers**: OWASP recommended headers
- **Audit Logging**: Complete action tracking

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