# Developer Guide

Complete development guide for the Hospital Management System.

## Project Overview

Modern hospital management platform with:
- **Frontend**: Next.js 14 + TypeScript
- **Backend**: FastAPI + PostgreSQL
- **Authentication**: JWT with role-based access
- **Database**: PostgreSQL with comprehensive schema

## Development Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- Git

### Environment Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd derma_hospital_demo_chennai
```

2. **Database Setup**
```bash
# Create database
createdb hospital_management_db

# Import schema
psql hospital_management_db < hospital_database_schema.sql
```

3. **Backend Setup**
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your database credentials

# Run server
python main.py
```

4. **Frontend Setup**
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

## Architecture Deep Dive

### Backend Architecture

```
app/
├── models/          # Database models (SQLAlchemy)
│   ├── user.py     # User authentication
│   ├── patient.py  # Patient profiles
│   ├── doctor.py   # Doctor profiles
│   └── ...
├── schemas/         # API schemas (Pydantic)
│   ├── auth.py     # Authentication schemas
│   ├── doctor.py   # Doctor API schemas
│   └── ...
├── services/        # Business logic
│   ├── auth_service.py      # Authentication logic
│   ├── doctor_service.py    # Doctor operations
│   └── ...
├── api/endpoints/   # API routes
│   ├── auth.py     # Authentication endpoints
│   ├── doctors.py  # Doctor endpoints
│   └── ...
├── auth.py          # JWT authentication
└── database.py      # Database configuration
```

### Frontend Architecture

```
src/
├── app/             # Next.js App Router
│   ├── (auth)/     # Authentication pages
│   ├── doctors/    # Doctor pages
│   └── ...
├── components/      # React components
│   ├── common/     # Shared components
│   ├── auth/       # Authentication components
│   └── ...
├── lib/            # Utilities
│   ├── api.ts      # API client
│   └── utils.ts    # Helper functions
└── types/          # TypeScript definitions
```

## Authentication System

### JWT Implementation

**Flow:**
1. User registers/logs in
2. Server returns JWT token
3. Client stores token
4. Client sends token in Authorization header
5. Server validates token and user permissions

**Role-Based Access:**
- **Doctor/Admin**: Full access to all data
- **Patient**: Access only to own data

### Implementation Details

**Backend (FastAPI):**
```python
# JWT token creation
def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode = {"exp": expire, **data}
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

# Role-based protection
def require_doctor(current_user: User = Depends(get_current_user)):
    if current_user.user_type not in ["doctor", "admin"]:
        raise HTTPException(status_code=403, detail="Doctor access required")
    return current_user
```

**Frontend (Next.js):**
```typescript
// API client with token
const api = {
  request: async (endpoint: string, options?: RequestInit) => {
    const token = localStorage.getItem('token');
    return fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  }
};
```

## Database Schema

### Key Tables

**users**: Base user authentication
**patients**: Patient-specific data
**doctors**: Doctor profiles and credentials
**appointments**: Booking system
**specialties**: Medical specialties
**health_packages**: Health checkup packages

### Relationships
- User → Patient (1:1)
- User → Doctor (1:1)
- Doctor → Specialty (N:1)
- Patient → Appointments (1:N)
- Doctor → Appointments (1:N)

## API Development

### Adding New Endpoints

1. **Create Model** (`app/models/`)
```python
class NewModel(Base):
    __tablename__ = "new_table"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
```

2. **Create Schema** (`app/schemas/`)
```python
class NewModelResponse(BaseModel):
    id: int
    name: str
    
    class Config:
        from_attributes = True
```

3. **Create Service** (`app/services/`)
```python
class NewModelService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all(self) -> List[NewModel]:
        return self.db.query(NewModel).all()
```

4. **Create Endpoint** (`app/api/endpoints/`)
```python
@router.get("/", response_model=List[NewModelResponse])
def get_items(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = NewModelService(db)
    return service.get_all()
```

5. **Add to Router** (`app/api/router.py`)
```python
from .endpoints import new_endpoint
api_router.include_router(new_endpoint.router, prefix="/new-items", tags=["New Items"])
```

## Frontend Development

### Component Structure

**Page Components**: Full page layouts
**Feature Components**: Specific functionality
**UI Components**: Reusable UI elements

### State Management

Using React hooks and Context API:
```typescript
// Auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### API Integration

```typescript
// Type-safe API calls
export const doctorsApi = {
  getAll: (params?: DoctorFilters): Promise<Doctor[]> =>
    api.get('/api/v1/doctors', params),
    
  getById: (id: string): Promise<Doctor> =>
    api.get(`/api/v1/doctors/${id}`),
};
```

## Testing Strategy

### Backend Testing
```python
# Test authentication
def test_login():
    response = client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

# Test role-based access
def test_doctor_access():
    token = get_doctor_token()
    response = client.get("/api/v1/appointments", 
                         headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
```

### Frontend Testing
```typescript
// Component testing
test('renders doctor card', () => {
  render(<DoctorCard doctor={mockDoctor} />);
  expect(screen.getByText(mockDoctor.name)).toBeInTheDocument();
});

// API testing
test('fetches doctors', async () => {
  const doctors = await doctorsApi.getAll();
  expect(doctors).toHaveLength(5);
});
```

## Deployment

### Backend Deployment
1. Set production environment variables
2. Use production database
3. Enable HTTPS
4. Configure CORS for production domain
5. Use production-grade WSGI server

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Set production API URL
3. Deploy to Vercel/Netlify
4. Configure environment variables

## Security Considerations

### Backend Security
- Use bcrypt for password hashing in production
- Implement refresh tokens
- Add rate limiting
- Validate all inputs
- Use HTTPS only
- Secure JWT secret key

### Frontend Security
- Store tokens securely
- Implement token refresh
- Validate user permissions
- Sanitize user inputs
- Use HTTPS

## Performance Optimization

### Backend
- Database query optimization
- Connection pooling
- Caching frequently accessed data
- Async operations where possible

### Frontend
- Code splitting
- Image optimization
- Lazy loading
- Caching API responses

## Troubleshooting

### Common Issues

**Database Connection:**
- Check PostgreSQL is running
- Verify connection string
- Ensure database exists

**Authentication Errors:**
- Check JWT secret key
- Verify token format
- Check token expiration

**CORS Issues:**
- Verify frontend URL in CORS settings
- Check request headers
- Ensure credentials are included

This guide provides the foundation for developing and maintaining the Hospital Management System.