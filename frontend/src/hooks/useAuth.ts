import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { authApi } from '@/lib/api';
import type { User, LoginFormData, RegisterFormData } from '@/types';
import { UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginFormData) => Promise<void>;
  register: (userData: RegisterFormData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

// Create Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Auth provider hook
export function useAuthProvider(): AuthContextType {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state by checking with server
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await authApi.getProfile();
        if (response.success && response.data) {
          setState({
            user: response.data as User,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error: any) {
        // User is not authenticated
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: LoginFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authApi.login(credentials);
      
      if (response.success && response.data) {
        const user = (response.data as any).user as User;
        
        // Tokens are now handled via httpOnly cookies on the server
        // No need to store tokens in localStorage
        
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Login failed',
      }));
      throw error;
    }
  }, []);

  const register = useCallback(async (userData: RegisterFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authApi.register(userData);
      
      if (response.success && response.data) {
        // Auto-login after successful registration
        await login({
          email: userData.email,
          password: userData.password,
        });
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Registration failed',
      }));
      throw error;
    }
  }, [login]);

  const logout = useCallback(async () => {
    try {
      // Call logout endpoint to clear httpOnly cookies
      await authApi.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    }
    
    // Reset auth state
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    
    // Redirect to home page
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!state.isAuthenticated) return;

    try {
      const response = await authApi.getProfile();
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          user: response.data as User,
        }));
      }
    } catch (error: any) {
      // If refresh fails, logout user
      logout();
    }
  }, [state.isAuthenticated, logout]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
    refreshUser,
    clearError,
  };
}

// Role-based access control hook
export function useRole(requiredRole?: UserRole | UserRole[]) {
  const { user, isAuthenticated } = useAuth();
  
  const hasRole = useCallback((role: UserRole | UserRole[]) => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  }, [user]);
  
  const canAccess = requiredRole ? hasRole(requiredRole) : isAuthenticated;
  
  return {
    user,
    isAuthenticated,
    canAccess,
    hasRole,
  };
}

// Permission-based access control
export function usePermissions() {
  const { user } = useAuth();
  
  const permissions = {
    // Patient permissions
    canBookAppointment: user?.role === UserRole.PATIENT,
    canViewOwnAppointments: user?.role === UserRole.PATIENT,
    canUpdateProfile: !!user,
    
    // Doctor permissions
    canViewAllAppointments: user?.role === UserRole.DOCTOR,
    canUpdateAppointmentStatus: user?.role === UserRole.DOCTOR,
    canViewPatientRecords: user?.role === UserRole.DOCTOR,
    
    // Admin permissions
    canManageUsers: user?.role === UserRole.ADMIN,
    canManageDoctors: user?.role === UserRole.ADMIN,
    canViewAnalytics: user?.role === UserRole.ADMIN,
    
    // Staff permissions
    canManageAppointments: [UserRole.ADMIN, UserRole.STAFF].includes(user?.role as UserRole),
    canViewReports: [UserRole.ADMIN, UserRole.STAFF, UserRole.DOCTOR].includes(user?.role as UserRole),
  };
  
  return permissions;
}

// Authentication guard hook for protected routes
export function useAuthGuard(requiredRole?: UserRole | UserRole[]) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { canAccess } = useRole(requiredRole);
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login if not authenticated
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      }
    } else if (!isLoading && isAuthenticated && requiredRole && !canAccess) {
      // Redirect to unauthorized page if user doesn't have required role
      if (typeof window !== 'undefined') {
        window.location.href = '/unauthorized';
      }
    }
  }, [isLoading, isAuthenticated, canAccess, requiredRole]);
  
  return {
    isAuthenticated,
    isLoading,
    canAccess,
    user,
  };
}