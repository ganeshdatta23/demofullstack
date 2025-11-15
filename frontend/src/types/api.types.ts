export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface AppError {
  code: string;
  message: string;
  details?: any;
}