# Hospital Management System

A comprehensive, production-grade hospital management platform built with modern technologies.

## 🏗️ Architecture

### Backend (Python FastAPI)
- **Framework**: FastAPI with async/await support
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with OAuth2
- **Task Queue**: Celery with Redis
- **API Documentation**: Auto-generated Swagger/OpenAPI

### Frontend (Next.js)
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **UI**: React 18+ with Shadcn/ui components
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini for symptom checker

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

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
hospital-management-system/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── main.py         # FastAPI app
│   ├── migrations/         # Database migrations
│   ├── tests/             # Backend tests
│   └── requirements.txt   # Python dependencies
│
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/          # Next.js app router
│   │   ├── components/   # React components
│   │   ├── lib/         # Utilities and API client
│   │   └── hooks/       # Custom React hooks
│   ├── public/          # Static assets
│   └── package.json     # Node.js dependencies
│
└── docs/                # Documentation
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

## 🌟 Features

### Core Features
- ✅ User Authentication (Patients, Doctors, Admin)
- ✅ Doctor Discovery and Profiles
- ✅ Appointment Booking System
- ✅ Medical Records Management
- ✅ Multi-Hospital Support
- ✅ AI-Powered Symptom Checker
- ✅ Real-time Notifications
- ✅ Payment Integration

### Advanced Features
- 🔄 Real-time Chat System
- 📊 Analytics Dashboard
- 📱 Mobile-Responsive Design
- 🔐 Role-Based Access Control
- 📧 Email/SMS Notifications
- 💳 Payment Gateway Integration
- 🏥 Multi-Tenant Architecture

## 🚀 Deployment

### Using Docker
```bash
# Backend
cd backend
docker-compose up -d

# Frontend
cd frontend
docker build -t hospital-frontend .
docker run -p 3000:3000 hospital-frontend
```

### Production Deployment
- **Backend**: Deploy to AWS ECS, Google Cloud Run, or similar
- **Frontend**: Deploy to Vercel, Netlify, or AWS Amplify
- **Database**: Use managed PostgreSQL (AWS RDS, Google Cloud SQL)
- **Cache**: Use managed Redis (AWS ElastiCache, Google Memorystore)

## 📚 API Documentation

The API follows RESTful conventions and includes:
- Authentication endpoints (`/auth/*`)
- Patient management (`/patients/*`)
- Doctor management (`/doctors/*`)
- Appointment system (`/appointments/*`)
- Hospital information (`/hospitals/*`)
- Medical records (`/medical-records/*`)

Full API documentation is available at `/api/docs` when running the backend.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation in `/docs`
- Review API documentation at `/api/docs`