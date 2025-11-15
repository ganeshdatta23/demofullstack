export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://api.yourdomain.com' : 'http://localhost:8000'),
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/v1/auth/login',
      REGISTER: '/api/v1/auth/register',
      REFRESH: '/api/v1/auth/refresh',
      ME: '/api/v1/auth/me',
      LOGOUT: '/api/v1/auth/logout',
    },
    DOCTORS: {
      LIST: '/api/v1/doctors',
      DETAIL: '/api/v1/doctors/:id',
      AVAILABILITY: '/api/v1/doctors/:id/availability',
      SEARCH: '/api/v1/doctors/search',
    },
    APPOINTMENTS: {
      LIST: '/api/v1/appointments',
      CREATE: '/api/v1/appointments',
      DETAIL: '/api/v1/appointments/:id',
      UPDATE: '/api/v1/appointments/:id',
      CANCEL: '/api/v1/appointments/:id/cancel',
    },
    SPECIALTIES: {
      LIST: '/api/v1/specialties',
      DETAIL: '/api/v1/specialties/:id',
    },
    HEALTH_PACKAGES: {
      LIST: '/api/v1/health-packages',
      DETAIL: '/api/v1/health-packages/:id',
    },
    SYMPTOM_CHECKER: {
      ANALYZE: '/api/v1/ai/symptom-check',
    },
  },
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};