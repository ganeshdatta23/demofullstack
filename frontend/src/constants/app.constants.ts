import type { NavItem, HospitalStats } from '@/types';

export const HOSPITAL_STATISTICS: HospitalStats = {
  hospitals: 4,
  beds: 2756,
  specialties: 62,
  doctors: 600,
};

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: 'About',
    items: [
      { label: 'Overview', href: '/about' },
      { label: 'Awards & Recognition', href: '/about/awards' },
      { label: 'Achievements', href: '/about/achievements' },
      { label: 'Apex Foundation', href: '/about/foundation' },
    ],
  },
  {
    label: 'News',
    items: [
      { label: 'News & Updates', href: '/news' },
      { label: 'Events', href: '/news/events' },
      { label: 'Medical Updates', href: '/news/medical' },
      { label: 'PR Coverage', href: '/news/pr' },
    ],
  },
  {
    label: 'Specialities',
    items: [
      { label: 'All Specialties', href: '/specialties' },
      { label: 'Cardiology', href: '/specialties/cardiology' },
      { label: 'Neurology', href: '/specialties/neurology' },
      { label: 'Oncology', href: '/specialties/oncology' },
      { label: 'Orthopedics', href: '/specialties/orthopedics' },
    ],
  },
  {
    label: 'Patient Info',
    items: [
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Patient Portal', href: '/patient-portal' },
      { label: 'Health Records', href: '/health-records' },
    ],
  },
  {
    label: 'Blog',
    items: [
      { label: 'All Categories', href: '/blog' },
      { label: 'Health Tips', href: '/blog/health-tips' },
      { label: 'Medical News', href: '/blog/medical-news' },
    ],
  },
  {
    label: 'Careers',
    items: [
      { label: 'Current Opportunities', href: '/careers' },
      { label: 'Doctor Positions', href: '/careers/doctors' },
      { label: 'Nursing Jobs', href: '/careers/nursing' },
    ],
  },
];

export const CONTACT_INFO = {
  EMERGENCY: {
    AMBULANCE: '108',
    HOSPITAL: '+91-44-4455-4455',
  },
  GENERAL: {
    PHONE: '+91-44-4554-4455',
    EMAIL: 'info@apexhospital.com',
    SUPPORT: 'support@apexhospital.com',
  },
  ADDRESS: {
    MAIN: {
      street: '123 Medical Center Drive',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600001',
      country: 'India',
    },
  },
  SOCIAL: {
    FACEBOOK: 'https://facebook.com/apexhospital',
    TWITTER: 'https://twitter.com/apexhospital',
    INSTAGRAM: 'https://instagram.com/apexhospital',
    LINKEDIN: 'https://linkedin.com/company/apexhospital',
  },
};

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[\d\s\-\(\)]{10,}$/,
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  NAME: /^[a-zA-Z\s]{2,50}$/,
};

export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION: 'Please check your input and try again.',
  APPOINTMENT_CONFLICT: 'This time slot is no longer available.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
};

export const SUCCESS_MESSAGES = {
  APPOINTMENT_BOOKED: 'Appointment booked successfully!',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  EMAIL_SENT: 'Email sent successfully.',
  REGISTRATION_SUCCESS: 'Registration successful! Please verify your email.',
};

export const LOADING_STATES = {
  INITIAL: 'Loading...',
  SUBMITTING: 'Submitting...',
  SAVING: 'Saving...',
  BOOKING: 'Booking appointment...',
  SEARCHING: 'Searching...',
  LOADING_DOCTORS: 'Loading doctors...',
  LOADING_APPOINTMENTS: 'Loading appointments...',
};

export const FEATURE_FLAGS = {
  SYMPTOM_CHECKER: process.env.NEXT_PUBLIC_ENABLE_SYMPTOM_CHECKER === 'true',
  TELEMEDICINE: process.env.NEXT_PUBLIC_ENABLE_TELEMEDICINE === 'true',
  PAYMENT_GATEWAY: process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === 'true',
  CHAT_SUPPORT: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
  NOTIFICATIONS: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
};

export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: '#2563eb',
    SECONDARY: '#64748b',
    SUCCESS: '#16a34a',
    WARNING: '#d97706',
    ERROR: '#dc2626',
    INFO: '#0ea5e9',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px',
  },
};

export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Apex Hospital - Your Partner in Health',
  DEFAULT_DESCRIPTION: 'Find top doctors, book appointments, and manage your health with Apex Hospital. 24/7 emergency services, expert care, and cutting-edge technology.',
  KEYWORDS: [
    'hospital',
    'healthcare',
    'doctors',
    'appointments',
    'medical care',
    'Chennai hospital',
    'emergency services',
    'health checkup',
  ],
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://apexhospital.com',
  TWITTER_HANDLE: '@apexhospital',
};