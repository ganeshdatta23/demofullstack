# Backend Pull Request

## Description
Brief description of backend changes made.

## Type of Change
- [ ] Bug fix
- [ ] New API endpoint
- [ ] Database migration
- [ ] Security enhancement
- [ ] Performance optimization
- [ ] Documentation update

## Backend Code Style Checklist
- [ ] All functions have type hints (`def func(param: str) -> bool:`)
- [ ] Follows import order (stdlib → third-party → local)
- [ ] Uses Pydantic schemas for request/response validation
- [ ] Proper error handling with try/catch blocks
- [ ] HTTPException with appropriate status codes
- [ ] Input validation and sanitization
- [ ] Secure password handling (bcrypt hashing)
- [ ] Database queries use async/await properly
- [ ] No N+1 query problems
- [ ] Proper logging statements (no sensitive data)
- [ ] Service layer pattern for business logic
- [ ] SQLAlchemy models follow naming conventions
- [ ] No hardcoded secrets or database URLs
- [ ] Docstrings for public functions and classes

## Security Checklist
- [ ] No plain text passwords stored
- [ ] SQL injection prevention (parameterized queries)
- [ ] Input validation using Pydantic validators
- [ ] Proper authentication/authorization checks
- [ ] Sensitive data excluded from API responses
- [ ] Rate limiting implemented (if applicable)
- [ ] CORS configuration is secure

## Database Changes
- [ ] Migration files created (if schema changes)
- [ ] Indexes added for query performance
- [ ] Foreign key constraints properly defined
- [ ] No breaking changes to existing data

## Testing
- [ ] Unit tests written for new functions
- [ ] Integration tests for API endpoints
- [ ] Database operations tested
- [ ] Error scenarios covered
- [ ] All existing tests pass

## API Documentation
- [ ] OpenAPI/Swagger documentation updated
- [ ] Request/response examples provided
- [ ] Error responses documented
- [ ] Authentication requirements specified

## Performance Considerations
- [ ] Database queries optimized
- [ ] Caching implemented (if applicable)
- [ ] Async operations used properly
- [ ] Memory usage considered

## Screenshots/Logs (if applicable)
Add API response examples or relevant logs.

## Additional Notes
Any additional backend-specific information.