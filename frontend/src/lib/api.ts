import { API_CONFIG, ERROR_MESSAGES } from '@/constants';
import { errorUtils } from './utils';
import type { ApiResponse, PaginatedResponse } from '@/types';

// API Client Class
class ApiClient {
  private baseURL: string;
  private timeout: number;
  private retryAttempts: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS;
  }

  // Auth tokens are now handled via httpOnly cookies
  // No client-side token management needed

  // Build request headers
  private buildHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
  }

  // Build full URL
  private buildUrl(endpoint: string): string {
    return `${this.baseURL}${endpoint}`;
  }

  // Handle API response
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data: any;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const error = {
        status: response.status,
        message: data?.message || data?.error || ERROR_MESSAGES.SERVER_ERROR,
        data,
      };

      // Handle specific status codes
      switch (response.status) {
        case 401:
          // Let the auth context handle the redirect
          throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
        case 403:
          throw new Error(ERROR_MESSAGES.FORBIDDEN);
        case 404:
          throw new Error(ERROR_MESSAGES.NOT_FOUND);
        default:
          throw new Error(error.message);
      }
    }

    return {
      success: true,
      data,
      message: data?.message,
    };
  }

  // Make HTTP request with retry logic
  private async makeRequest<T>(
    method: string,
    endpoint: string,
    options: RequestInit = {},
    attempt: number = 1
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const headers = this.buildHeaders(options.headers as Record<string, string>);

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include', // Include cookies for authentication
      ...options,
    };

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      return await this.handleResponse<T>(response);
    } catch (error: any) {
      clearTimeout(timeoutId);

        // Retry on network errors and 5xx server errors
      if (attempt < this.retryAttempts && (errorUtils.isNetworkError(error) || (error.status >= 500 && error.status < 600))) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        return this.makeRequest<T>(method, endpoint, options, attempt + 1);
      }

      throw new Error(errorUtils.getErrorMessage(error));
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    return this.makeRequest<T>('GET', url);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('POST', endpoint, {
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('PUT', endpoint, {
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('PATCH', endpoint, {
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('DELETE', endpoint);
  }

  // File upload
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const headers = this.buildHeaders();
    delete headers['Content-Type']; // Let browser set Content-Type for FormData
    
    return this.makeRequest<T>('POST', endpoint, {
      body: formData,
      headers,
    });
  }

  // Auth methods are no longer needed with httpOnly cookies
}

// Create singleton instance
export const api = new ApiClient();

// API service functions
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials),

  register: (userData: any) =>
    api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData),

  refreshToken: () =>
    api.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH),

  getProfile: () =>
    api.get(API_CONFIG.ENDPOINTS.AUTH.ME),

  logout: () =>
    api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT),
};

export const doctorsApi = {
  getAll: (params?: any) =>
    api.get<PaginatedResponse<any>>(API_CONFIG.ENDPOINTS.DOCTORS.LIST, params),

  getById: (id: string) =>
    api.get(API_CONFIG.ENDPOINTS.DOCTORS.DETAIL.replace(':id', id)),

  getAvailability: (id: string, date?: string) =>
    api.get(API_CONFIG.ENDPOINTS.DOCTORS.AVAILABILITY.replace(':id', id), { date }),

  search: (query: string, filters?: any) =>
    api.get(API_CONFIG.ENDPOINTS.DOCTORS.SEARCH, { q: query, ...filters }),
};

export const appointmentsApi = {
  getAll: (params?: any) =>
    api.get<PaginatedResponse<any>>(API_CONFIG.ENDPOINTS.APPOINTMENTS.LIST, params),

  create: (appointmentData: any) =>
    api.post(API_CONFIG.ENDPOINTS.APPOINTMENTS.CREATE, appointmentData),

  getById: (id: string) =>
    api.get(API_CONFIG.ENDPOINTS.APPOINTMENTS.DETAIL.replace(':id', id)),

  update: (id: string, data: any) =>
    api.put(API_CONFIG.ENDPOINTS.APPOINTMENTS.UPDATE.replace(':id', id), data),

  cancel: (id: string, reason?: string) =>
    api.post(API_CONFIG.ENDPOINTS.APPOINTMENTS.CANCEL.replace(':id', id), { reason }),
};

export const specialtiesApi = {
  getAll: () =>
    api.get(API_CONFIG.ENDPOINTS.SPECIALTIES.LIST),

  getById: (id: string) =>
    api.get(API_CONFIG.ENDPOINTS.SPECIALTIES.DETAIL.replace(':id', id)),
};

export const healthPackagesApi = {
  getAll: () =>
    api.get(API_CONFIG.ENDPOINTS.HEALTH_PACKAGES.LIST),

  getById: (id: string) =>
    api.get(API_CONFIG.ENDPOINTS.HEALTH_PACKAGES.DETAIL.replace(':id', id)),
};

export const symptomCheckerApi = {
  analyze: (symptoms: any) =>
    api.post(API_CONFIG.ENDPOINTS.SYMPTOM_CHECKER.ANALYZE, symptoms),
};

// Export default api instance
export default api;