import { API_CONFIG } from '@/constants/api.constants';
import type { ApiResponse, LoginFormData, RegisterFormData, User } from '@/types';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  setTokens(accessToken: string, refreshToken?: string) {
    this.token = accessToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }
    }
  }

  clearTokens() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    return this.request<T>(url);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.post<any>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return response;
  }

  async register(userData: RegisterFormData) {
    const response = await this.post<User>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
    return response;
  }

  async getCurrentUser(): Promise<User> {
    return this.get<User>(API_CONFIG.ENDPOINTS.AUTH.ME);
  }

  async logout() {
    try {
      await this.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } finally {
      this.clearTokens();
    }
  }
}

export const apiClient = new ApiClient();

// Backward compatibility
export const api = {
  get: <T>(endpoint: string, params?: Record<string, any>) => apiClient.get<T>(endpoint, params),
  post: <T>(endpoint: string, data?: any) => apiClient.post<T>(endpoint, data),
  put: <T>(endpoint: string, data?: any) => apiClient.put<T>(endpoint, data),
  delete: <T>(endpoint: string) => apiClient.delete<T>(endpoint),
};

// API functions
export const specialtiesApi = {
  getAll: () => api.get(API_CONFIG.ENDPOINTS.SPECIALTIES.LIST),
};

export const doctorsApi = {
  getAll: (params?: any) => api.get(API_CONFIG.ENDPOINTS.DOCTORS.LIST, params),
  getById: (id: string) => api.get(API_CONFIG.ENDPOINTS.DOCTORS.DETAIL.replace(':id', id)),
  search: (params: any) => api.get(API_CONFIG.ENDPOINTS.DOCTORS.SEARCH, params),
};

export const appointmentsApi = {
  getAll: () => api.get(API_CONFIG.ENDPOINTS.APPOINTMENTS.LIST),
  create: (data: any) => api.post(API_CONFIG.ENDPOINTS.APPOINTMENTS.CREATE, data),
  getById: (id: string) => api.get(API_CONFIG.ENDPOINTS.APPOINTMENTS.DETAIL.replace(':id', id)),
  cancel: (id: string) => api.post(API_CONFIG.ENDPOINTS.APPOINTMENTS.CANCEL.replace(':id', id)),
};

export const healthPackagesApi = {
  getAll: () => api.get(API_CONFIG.ENDPOINTS.HEALTH_PACKAGES.LIST),
  getById: (id: string) => api.get(API_CONFIG.ENDPOINTS.HEALTH_PACKAGES.DETAIL.replace(':id', id)),
};

export const authApi = {
  login: (data: LoginFormData) => apiClient.login(data.email, data.password),
  register: (data: RegisterFormData) => apiClient.register(data),
  getProfile: () => apiClient.getCurrentUser(),
  logout: () => apiClient.logout(),
};