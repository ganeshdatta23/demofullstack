import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from 'date-fns';
import { VALIDATION_RULES, ERROR_MESSAGES } from '@/constants';
import type { ApiResponse } from '@/types';

// Utility function for combining class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export const dateUtils = {
  format: (date: string | Date, formatStr: string = 'PPP') => {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      return isValid(dateObj) ? format(dateObj, formatStr) : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  },
  
  formatTime: (time: string) => {
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  },
  
  isToday: (date: string | Date) => {
    const today = new Date();
    const compareDate = typeof date === 'string' ? parseISO(date) : date;
    return today.toDateString() === compareDate.toDateString();
  },
  
  addDays: (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
};

// Validation utilities
export const validationUtils = {
  email: (email: string) => VALIDATION_RULES.EMAIL.test(email),
  
  phone: (phone: string) => VALIDATION_RULES.PHONE.test(phone),
  
  password: (password: string) => {
    return {
      isValid: password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH && 
               VALIDATION_RULES.PASSWORD.PATTERN.test(password),
      minLength: password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password),
    };
  },
  
  name: (name: string) => VALIDATION_RULES.NAME.test(name),
};

// String utilities
export const stringUtils = {
  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
  
  truncate: (str: string, length: number) => {
    return str.length > length ? `${str.substring(0, length)}...` : str;
  },
  
  slugify: (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },
  
  initials: (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  },
};

// Number utilities
export const numberUtils = {
  formatCurrency: (amount: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  },
  
  formatNumber: (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  },
  
  clamp: (num: number, min: number, max: number) => {
    return Math.min(Math.max(num, min), max);
  },
};

// Array utilities
export const arrayUtils = {
  unique: <T>(arr: T[]) => [...new Set(arr)],
  
  groupBy: <T, K extends keyof T>(arr: T[], key: K) => {
    return arr.reduce((groups, item) => {
      const group = item[key] as unknown as string;
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },
  
  shuffle: <T>(arr: T[]) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
};

// Local storage utilities with security validation
export const storageUtils = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') return defaultValue || null;
    
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue || null;
      
      // Basic validation to prevent XSS
      if (typeof item === 'string' && (item.includes('<script') || item.includes('javascript:'))) {
        console.warn('Potentially malicious content detected in localStorage');
        localStorage.removeItem(key);
        return defaultValue || null;
      }
      
      return JSON.parse(item);
    } catch (error) {
      console.warn('Failed to parse localStorage item:', error);
      localStorage.removeItem(key); // Remove corrupted data
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    
    try {
      // Validate key and value
      if (!key || typeof key !== 'string') {
        throw new Error('Invalid storage key');
      }
      
      const serialized = JSON.stringify(value);
      
      // Basic XSS prevention
      if (serialized.includes('<script') || serialized.includes('javascript:')) {
        throw new Error('Potentially unsafe content');
      }
      
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};

// URL utilities
export const urlUtils = {
  buildUrl: (base: string, params: Record<string, any>) => {
    const url = new URL(base);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
    return url.toString();
  },
  
  getQueryParams: () => {
    if (typeof window === 'undefined') return {};
    
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string> = {};
    
    params.forEach((value, key) => {
      result[key] = value;
    });
    
    return result;
  },
};

// Error handling utilities
export const errorUtils = {
  getErrorMessage: (error: any): string => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.response?.data?.message) return error.response.data.message;
    return ERROR_MESSAGES.SERVER_ERROR;
  },
  
  isNetworkError: (error: any): boolean => {
    return !error.response || error.code === 'NETWORK_ERROR';
  },
};

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Sleep utility
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate random ID
export const generateId = () => Math.random().toString(36).substring(2, 15);

// Check if device is mobile
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  }
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
