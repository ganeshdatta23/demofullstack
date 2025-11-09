/**
 * API client configuration and utilities
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;
  private refreshToken: string | null = null;
  private isRefreshing = false;
  private failedQueue: Array<{resolve: Function; reject: Function}> = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    
    // Get tokens from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
      this.refreshToken = localStorage.getItem('refresh_token');
    }
  }

  setTokens(accessToken: string, refreshToken?: string) {
    this.token = accessToken;
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }
    }
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized - attempt token refresh
      if (response.status === 401 && this.refreshToken && !endpoint.includes('/auth/')) {
        try {
          await this.refreshAccessToken();
          // Retry original request with new token
          const newHeaders = { ...headers };
          if (this.token) {
            newHeaders.Authorization = `Bearer ${this.token}`;
          }
          const retryResponse = await fetch(url, { ...config, headers: newHeaders });
          if (retryResponse.ok) {
            return await retryResponse.json();
          }
        } catch (refreshError) {
          this.clearTokens();
          throw new Error('Session expired. Please login again.');
        }
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || errorData.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const result = await this.request('/auth/login', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
    
    // Store tokens after successful login
    if (result.access_token) {
      this.setTokens(result.access_token, result.refresh_token);
    }
    
    return result;
  }
  
  private async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const result = await this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: this.refreshToken }),
    });
    
    if (result.access_token) {
      this.setTokens(result.access_token, result.refresh_token);
    }
    
    return result;
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Doctors methods
  async getDoctors(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/doctors${queryString}`);
  }

  async getDoctorById(id: string) {
    return this.request(`/doctors/${id}`);
  }

  // Appointments methods
  async getAppointments() {
    return this.request('/appointments');
  }

  async createAppointment(appointmentData: any) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  // Specialities methods
  async getSpecialities() {
    return this.request('/specialities');
  }

  // Hospitals methods
  async getHospitals() {
    return this.request('/hospitals');
  }

  async getHospitalById(id: string) {
    return this.request(`/hospitals/${id}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;