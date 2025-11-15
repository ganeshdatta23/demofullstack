# Apex Hospital Management System

A comprehensive, production-grade hospital management platform built with modern technologies for scalability, security, and exceptional user experience.

## Features

### Core Features
- **Multi-Specialty Care**: 25+ medical specialties with expert doctors
- **24/7 Emergency Services**: Round-the-clock emergency care
- **Online Appointments**: Easy booking with real-time availability
- **AI Symptom Checker**: Google Gemini-powered health assessment
- **Patient Portal**: Comprehensive medical records management
- **Doctor Discovery**: Advanced search with filters and reviews
- **Health Packages**: Preventive care and wellness programs
- **Telemedicine**: Video consultations and remote care

### Security & Compliance
- JWT authentication with refresh tokens
- HIPAA-compliant data handling
- End-to-end encryption
- Role-based access control
- Audit trails and logging

## Architecture

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

## Quick Start

### Prerequisites
- **Node.js 18+** with npm/yarn
- **Python 3.11+** (Conda recommended)
- **PostgreSQL 15+** (or Docker)
- **Redis 7+** (or Docker)
- **Git** for version control

### Backend Setup

```bash
# Clone repository
git clone <repository-url>
cd derma_hospital_demo_chennai/backend

# Create virtual environment
conda create -n hospital_backend python=3.11
conda activate hospital_backend

# Install dependencies
pip install -r requirements.txt

# Setup database (Docker recommended)
docker-compose up -d postgres redis

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend URLs:**
- API Server: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### Frontend Setup

```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your settings

# Start development server
npm run dev
```

**Frontend URLs:**
- Development Server: http://localhost:3000

## Project Structure

```
derma_hospital_demo_chennai/
├── backend/                           # Python FastAPI Backend
│   ├── app/
│   │   ├── api/v1/                   # API Version 1
│   │   │   ├── auth/                 # Authentication routes
│   │   │   ├── doctors/              # Doctor management
│   │   │   ├── appointments/         # Appointment system
│   │   │   ├── patients/             # Patient management
│   │   │   └── specialities/         # Medical specialties
│   │   ├── models/                   # SQLAlchemy Models
│   │   ├── schemas/                  # Pydantic Schemas
│   │   ├── services/                 # Business Logic
│   │   ├── middleware/               # Custom Middleware
│   │   ├── utils/                    # Utility Functions
│   │   ├── config.py                 # App Configuration
│   │   ├── database.py               # Database Connection
│   │   └── main.py                   # FastAPI App Entry
│   ├── migrations/                   # Alembic Migrations
│   ├── tests/                        # Test Suite
│   ├── requirements.txt              # Python Dependencies
│   └── docker-compose.yml            # Development Services
│
├── frontend/                         # Next.js Frontend
│   ├── src/
│   │   ├── app/                     # Next.js App Router
│   │   │   ├── (auth)/              # Auth Route Group
│   │   │   ├── doctors/             # Doctor Discovery
│   │   │   ├── appointments/        # Appointment Management
│   │   │   ├── symptom-checker/     # AI Symptom Checker
│   │   │   └── dashboard/           # User Dashboard
│   │   ├── components/              # React Components
│   │   │   ├── ui/                  # Shadcn/ui Components
│   │   │   ├── common/              # Shared Components
│   │   │   ├── pages/               # Page Components
│   │   │   ├── home/                # Homepage Components
│   │   │   ├── doctors/             # Doctor Components
│   │   │   ├── appointments/        # Appointment Components
│   │   │   └── auth/                # Authentication Components
│   │   ├── hooks/                   # Custom React Hooks
│   │   │   ├── useAuth.ts           # Authentication hook
│   │   │   ├── useApi.ts            # API hooks
│   │   │   └── use-toast.ts         # Toast notifications
│   │   ├── lib/                     # Utilities & Config
│   │   │   ├── api.ts               # API client
│   │   │   ├── utils.ts             # Utility functions
│   │   │   └── types.ts             # TypeScript types
│   │   ├── types/                   # TypeScript Type Definitions
│   │   │   └── index.ts             # Main types file
│   │   ├── styles/                  # Style System
│   │   │   └── index.ts             # Style variants and utilities
│   │   ├── constants/               # Application Constants
│   │   │   └── index.ts             # Configuration and constants
│   │   └── contexts/                # React Contexts
│   │       └── AuthContext.tsx      # Authentication context
│   ├── public/                      # Static Assets
│   ├── package.json                 # Dependencies
│   ├── tailwind.config.ts           # Tailwind CSS Config
│   └── tsconfig.json                # TypeScript Config
│
└── README.md                        # Project Documentation
```

## Component Architecture

### Type System
The application uses a comprehensive TypeScript type system located in `/src/types/`:

```typescript
// Core entity types
interface User, Doctor, Patient, Appointment
interface Specialty, HealthPackage, Review

// Enums for type safety
enum UserRole, AppointmentStatus, UrgencyLevel

// API response types
interface ApiResponse<T>, PaginatedResponse<T>

// Form validation types
interface LoginFormData, RegisterFormData
```

### Style System
Centralized styling system in `/src/styles/`:

```typescript
// Component variants using class-variance-authority
buttonVariants, cardVariants, badgeVariants

// Layout utilities
layoutClasses, typographyClasses, spacingClasses

// Medical-specific styles
medicalClasses, responsiveClasses
```

### Constants & Configuration
All configuration centralized in `/src/constants/`:

```typescript
// API endpoints and configuration
API_CONFIG, ROUTES

// Navigation and UI data
NAVIGATION_ITEMS, MEDICAL_SPECIALTIES

// Application settings
CONTACT_INFO, VALIDATION_RULES, FEATURE_FLAGS
```

## Development Workflow

### Code Organization Principles

1. **Separation of Concerns**: Clear separation between UI, business logic, and data
2. **Type Safety**: Comprehensive TypeScript coverage
3. **Reusability**: Modular components and utilities
4. **Maintainability**: Consistent patterns and naming conventions
5. **Performance**: Optimized loading and rendering

### Custom Hooks

```typescript
// API data fetching
useApi<T>(endpoint, options)
useApiMutation<TData, TVariables>(mutationFn)
usePaginatedApi<T>(endpoint, options)

// Authentication
useAuth() // Main auth hook
useRole(requiredRole) // Role-based access
usePermissions() // Permission checking
useAuthGuard(requiredRole) // Route protection
```

### Utility Functions

```typescript
// Date utilities
dateUtils.format(), dateUtils.formatTime()

// Validation utilities
validationUtils.email(), validationUtils.password()

// String utilities
stringUtils.capitalize(), stringUtils.truncate()

// Storage utilities
storageUtils.get(), storageUtils.set()
```

## UI Components

### Shadcn/ui Integration
```bash
# Core components
npx shadcn-ui@latest add button card input label
npx shadcn-ui@latest add dialog dropdown-menu avatar
npx shadcn-ui@latest add calendar date-picker badge
```

### Custom Component Structure
```typescript
// Consistent component props
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Typed component variants
type ButtonVariants = VariantProps<typeof buttonVariants>;
```

## Authentication & Security

### Secure Authentication Flow
1. User login with credentials
2. Server validates and returns JWT tokens
3. Tokens stored in secure httpOnly cookies
4. Automatic token refresh and renewal
5. Secure logout with cookie clearing

### Role-Based Access Control
```typescript
// User roles
enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin',
  STAFF = 'staff'
}

// Permission checking
const { canAccess } = useRole(UserRole.DOCTOR);
const permissions = usePermissions();
```

## Responsive Design

### Breakpoint System
```typescript
// Tailwind breakpoints
SM: '640px'   // Mobile landscape
MD: '768px'   // Tablet
LG: '1024px'  // Desktop
XL: '1280px'  // Large desktop
2XL: '1536px' // Extra large
```

### Mobile-First Approach
- Progressive enhancement from mobile
- Touch-friendly interactions
- Optimized performance for mobile devices

## Testing Strategy

### Frontend Testing
```bash
# Unit tests with Jest & React Testing Library
npm test

# E2E tests with Playwright
npm run test:e2e

# Security audit
npm run audit
```

### Backend Testing
```bash
# Unit and integration tests
pytest

# Coverage reports
pytest --cov=app --cov-report=html

# API testing
pytest tests/test_api.py
```

## Deployment

### Environment Configuration

#### Production Environment Variables
```bash
# Backend (.env.prod)
ENVIRONMENT=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/hospital_db
REDIS_URL=redis://prod-redis:6379
SECRET_KEY=your-secure-64-character-secret-key

# Frontend (.env.production)
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose -f docker-compose.prod.yml up -d --scale backend=3
```

## Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching**: React Query for API state management
- **Bundle Analysis**: Webpack bundle analyzer

### Backend Optimizations
- **Database Indexing**: Optimized queries
- **Caching**: Redis for frequently accessed data
- **Connection Pooling**: PostgreSQL connection management
- **Async Processing**: Celery for background tasks

## Security Features

### Authentication & Authorization
- **HttpOnly Cookies**: Secure token storage
- **CSRF Protection**: SameSite cookie attributes
- **Role-Based Access**: Granular permissions
- **Password Security**: Strong validation requirements

### Data Protection
- **Input Validation**: Comprehensive sanitization
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy
- **Rate Limiting**: IP-based request throttling

## API Documentation

### Authentication Endpoints
```typescript
POST /api/v1/auth/login     // User login
POST /api/v1/auth/register  // User registration
POST /api/v1/auth/refresh   // Token refresh
GET  /api/v1/auth/me        // Get current user
POST /api/v1/auth/logout    // User logout
```

### Core Endpoints
```typescript
GET    /api/v1/doctors           // List doctors
GET    /api/v1/doctors/:id       // Get doctor details
POST   /api/v1/appointments      // Create appointment
GET    /api/v1/appointments      // List appointments
GET    /api/v1/specialties       // List specialties
POST   /api/v1/ai/symptom-check  // AI symptom analysis
```

## Contributing

### Development Guidelines
1. **Code Style**: Follow ESLint and Prettier configurations
2. **Commit Messages**: Use conventional commit format
3. **Testing**: Write tests for new features
4. **Documentation**: Update README and inline docs
5. **Type Safety**: Maintain TypeScript coverage

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Submit PR with clear description
5. Address review feedback

## Support & Help

### Common Issues
1. **Port conflicts**: Change ports in configuration
2. **Database connection**: Check PostgreSQL service
3. **Authentication errors**: Verify JWT configuration
4. **Build failures**: Clear node_modules and reinstall

### Getting Help
- **Documentation**: Check inline code comments
- **Issues**: Create GitHub issue with details
- **Community**: Join our Discord/Slack channel
- **Email**: support@apexhospital.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Shadcn**: For the beautiful UI component library
- **FastAPI Team**: For the high-performance Python framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Radix UI**: For accessible component primitives

---

Built for better healthcare accessibilityadmin',
  STAFF = 'staff'
}

// Permission checking
const { canAccess } = useRole(UserRole.DOCTOR);
const permissions = usePermissions();
```

## Responsive Design

### Breakpoint System
```typescript
// Tailwind breakpoints
SM: '640px'   // Mobile landscape
MD: '768px'   // Tablet
LG: '1024px'  // Desktop
XL: '1280px'  // Large desktop
2XL: '1536px' // Extra large
```

### Mobile-First Approach
- Progressive enhancement from mobile
- Touch-friendly interactions
- Optimized performance for mobile devices

## Testing Strategy

### Frontend Testing
```bash
# Unit tests with Jest & React Testing Library
npm test

# E2E tests with Playwright
npm run test:e2e

# Component testing with Storybook
npm run storybook
```

### Backend Testing
```bash
# Unit and integration tests
pytest

# Coverage reports
pytest --cov=app --cov-report=html

# API testing
pytest tests/test_api.py
```

## Deployment

### Environment Configuration

#### Production Environment Variables
```bash
# Backend (.env.prod)
ENVIRONMENT=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/hospital_db
REDIS_URL=redis://prod-redis:6379
SECRET_KEY=super-secure-production-key

# Frontend (.env.production)
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose -f docker-compose.prod.yml up -d --scale backend=3
```

### Cloud Deployment Options

#### Vercel (Frontend)
```bash
# Deploy to Vercel
vercel --prod

# Environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

#### Railway/Heroku (Backend)
```bash
# Deploy to Railway
railway up

# Deploy to Heroku
git push heroku main
```

## Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching**: React Query for API state management
- **Bundle Analysis**: Webpack bundle analyzer

### Backend Optimizations
- **Database Indexing**: Optimized queries
- **Caching**: Redis for frequently accessed data
- **Connection Pooling**: PostgreSQL connection management
- **Async Processing**: Celery for background tasks

## Monitoring & Analytics

### Error Tracking
```typescript
// Sentry integration
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn
```

### Performance Monitoring
- Core Web Vitals tracking
- API response time monitoring
- Database query performance
- User interaction analytics

## Contributing

### Development Guidelines
1. **Code Style**: Follow ESLint and Prettier configurations
2. **Commit Messages**: Use conventional commit format
3. **Testing**: Write tests for new features
4. **Documentation**: Update README and inline docs
5. **Type Safety**: Maintain TypeScript coverage

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Submit PR with clear description
5. Address review feedback

## API Documentation

### Authentication Endpoints
```typescript
POST /api/v1/auth/login     // User login
POST /api/v1/auth/register  // User registration
POST /api/v1/auth/refresh   // Token refresh
GET  /api/v1/auth/me        // Get current user
```

### Core Endpoints
```typescript
GET    /api/v1/doctors           // List doctors
GET    /api/v1/doctors/:id       // Get doctor details
POST   /api/v1/appointments      // Create appointment
GET    /api/v1/appointments      // List appointments
GET    /api/v1/specialties       // List specialties
POST   /api/v1/ai/symptom-check  // AI symptom analysis
```

## Support & Help

### Common Issues
1. **Port conflicts**: Change ports in configuration
2. **Database connection**: Check PostgreSQL service
3. **Authentication errors**: Verify JWT configuration
4. **Build failures**: Clear node_modules and reinstall

### Getting Help
- **Documentation**: Check inline code comments
- **Issues**: Create GitHub issue with details
- **Community**: Join our Discord/Slack channel
- **Email**: support@apexhospital.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Shadcn**: For the beautiful UI component library
- **FastAPI Team**: For the high-performance Python framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Radix UI**: For accessible component primitives

---

Built for better healthcare accessibility