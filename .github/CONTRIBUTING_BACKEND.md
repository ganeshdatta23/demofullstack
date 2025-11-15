# Contributing to Apex Hospital Backend

## Backend Development Guidelines

Please follow our [Backend Coding Style Guide](.apex-hospital/rules/backend-coding-style.md) for all Python/FastAPI contributions.

## Quick Backend Rules

### ✅ Required Practices
- **Type Hints**: All functions must have type annotations
- **Async/Await**: Use async operations for database and I/O
- **Pydantic Schemas**: Validate all request/response data
- **Service Layer**: Business logic in service classes
- **Error Handling**: Proper try/catch with HTTPException
- **Security**: Hash passwords, validate inputs, sanitize data
- **Logging**: Structured logging without sensitive data

### ❌ Forbidden Practices
- Plain text password storage
- Synchronous database operations in async functions
- Missing type hints
- Hardcoded secrets or URLs
- SQL string concatenation
- Exposing sensitive data in API responses

## Development Setup

### Prerequisites
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

### Setup Steps
```bash
# 1. Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# 2. Install dependencies
pip install -r requirements.txt

# 3. Setup environment
cp .env.example .env
# Edit .env with your settings

# 4. Run migrations
alembic upgrade head

# 5. Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Code Style Checklist

### Before Submitting Backend PR
- [ ] All functions have type hints
- [ ] Follows import order (stdlib → third-party → local)
- [ ] Uses Pydantic for validation
- [ ] Proper async/await usage
- [ ] Service layer for business logic
- [ ] Secure error handling
- [ ] Database queries optimized
- [ ] Tests written and passing
- [ ] No hardcoded secrets
- [ ] Logging without sensitive data

## API Development Standards

### Route Structure
```python
@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
) -> UserResponse:
    """Create a new user account."""
    try:
        service = UserService(db)
        return await service.create_user(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
```

### Database Operations
```python
# ✅ Async operations with proper error handling
async def get_user_by_id(db: AsyncSession, user_id: int) -> Optional[User]:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()
```

### Security Requirements
```python
# ✅ Password hashing
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)
```

## Testing Requirements

### Test Coverage
- Unit tests for services
- Integration tests for API endpoints
- Database operation tests
- Error scenario testing

### Test Example
```python
@pytest.mark.asyncio
async def test_create_user():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/api/v1/users/", json=user_data)
        assert response.status_code == 201
```

## Database Guidelines

### Migration Process
1. Create migration: `alembic revision --autogenerate -m "description"`
2. Review generated migration
3. Test migration up and down
4. Include in PR

### Model Standards
```python
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

## Security Guidelines

### Authentication
- JWT tokens with secure expiration
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting on auth endpoints

### Data Protection
- No sensitive data in logs
- Parameterized database queries
- CORS configuration for production
- Environment-based configuration

## Performance Standards

### Database Optimization
- Use indexes for frequently queried columns
- Implement connection pooling
- Avoid N+1 queries with proper joins
- Cache frequently accessed data

### API Performance
- Async operations for I/O
- Pagination for large datasets
- Response compression
- Proper HTTP status codes

## Commit Message Format
```
type(scope): description

feat(auth): add JWT token refresh endpoint
fix(users): resolve email validation issue
perf(db): optimize user query with indexes
security(auth): implement rate limiting
```

## Documentation Requirements
- Docstrings for all public functions
- API endpoint documentation
- Schema descriptions
- Error response examples

This ensures secure, performant, and maintainable Python/FastAPI backend code.