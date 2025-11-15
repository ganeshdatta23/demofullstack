import { ReactNode } from 'react';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface NavItem {
  label: string;
  href?: string;
  items?: NavItem[];
}

export interface MenuItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  description?: string;
}

export interface PlaceholderImage {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
}

export interface HospitalStats {
  hospitals: number;
  beds: number;
  specialties: number;
  doctors: number;
}

export interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  date: string;
  verified: boolean;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  fonts: {
    body: string;
    heading: string;
  };
}