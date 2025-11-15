export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  location: string;
  availableToday: boolean;
  profileImage?: string;
  languages: string[];
  qualifications: string[];
  bio?: string;
  workingHours: WorkingHours;
  awards?: string[];
  specializations?: string[];
}

export interface Patient {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: Address;
  emergencyContact?: EmergencyContact;
  medicalHistory?: MedicalHistory[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  reason?: string;
  patientNotes?: string;
  doctorNotes?: string;
  consultationFee: number;
  type: AppointmentType;
  createdAt: string;
  updatedAt: string;
}

export interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: string;
  doctorCount: number;
  imageUrl?: string;
  color?: string;
}

export interface HealthPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  items: string[];
  duration?: string;
  imageUrl?: string;
  category: PackageCategory;
  popular?: boolean;
}

export interface Review {
  id: string;
  patientName: string;
  doctorId: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  type?: 'online' | 'offline';
}

export interface AvailabilitySlot {
  date: string;
  slots: TimeSlot[];
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  RESCHEDULED = 'rescheduled'
}

export enum AppointmentType {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export enum PackageCategory {
  BASIC = 'basic',
  PREMIUM = 'premium',
  SPECIALIZED = 'specialized'
}

export enum UrgencyLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  EMERGENCY = 'emergency'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface MedicalHistory {
  condition: string;
  diagnosedDate: string;
  status: 'active' | 'resolved' | 'chronic';
  notes?: string;
}

export interface WorkingHours {
  [key: string]: string;
}

export interface AppointmentFormData {
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  patientNotes?: string;
  type: AppointmentType;
}

export interface DoctorSearchFilters {
  specialty?: string;
  location?: string;
  availableToday?: boolean;
  rating?: number;
  consultationFee?: {
    min: number;
    max: number;
  };
}