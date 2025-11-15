---
name: Backend Bug Report
about: Report a backend API or server issue
title: '[BACKEND BUG] '
labels: bug, backend
assignees: ''
---

## Bug Description
A clear description of the backend issue.

## API Endpoint
- **Method**: GET/POST/PUT/DELETE
- **URL**: `/api/v1/endpoint`
- **Headers**: (if relevant)

## Request Payload
```json
{
  "example": "request data"
}
```

## Expected Response
```json
{
  "expected": "response format"
}
```

## Actual Response
```json
{
  "error": "actual error response"
}
```

## Steps to Reproduce
1. Make API call to '...'
2. With payload '...'
3. See error response

## Server Logs
```
[Include relevant server logs here]
```

## Environment
- **Python Version**: 3.11
- **FastAPI Version**: 
- **Database**: PostgreSQL/MySQL
- **OS**: Windows/Linux/macOS

## Database State
- [ ] Issue occurs with fresh database
- [ ] Issue occurs with existing data
- [ ] Migration related

## Security Impact
- [ ] No security implications
- [ ] Potential data exposure
- [ ] Authentication bypass
- [ ] Authorization issue

## Additional Context
Any other context about the backend problem.