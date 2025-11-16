// Re-export all types from individual modules
export * from './api.types';
export * from './auth.types';
export * from './medical.types';
export * from './ui.types';

// Core types for backward compatibility
export interface Specialty {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

export interface Doctor {
  id: number;
  full_name: string;
  specialty_name?: string;
  experience_years: number;
  consultation_fee_onsite?: number;
  consultation_fee_online?: number;
  rating: number;
  total_reviews: number;
  bio?: string;
}

// Legacy User interface for backward compatibility
export interface LegacyUser {
  id: number;
  name: string;
  email: string;
}