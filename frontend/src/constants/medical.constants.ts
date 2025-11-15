import { HeartPulse, Brain, Bone, Baby, Heart, Shield, Clock, Award } from 'lucide-react';

export const MEDICAL_SPECIALTIES = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: HeartPulse,
    imageId: 'specialty-cardiology',
    description: 'Heart & Vascular Care',
    doctors: '25+ Specialists',
    color: 'red',
  },
  {
    id: 'neurology',
    name: 'Neurology',
    icon: Brain,
    imageId: 'specialty-neurology',
    description: 'Brain & Nervous System',
    doctors: '18+ Specialists',
    color: 'purple',
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    icon: Bone,
    imageId: 'specialty-orthopedics',
    description: 'Bone & Joint Care',
    doctors: '22+ Specialists',
    color: 'blue',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    icon: Baby,
    imageId: 'specialty-pediatrics',
    description: 'Child Healthcare',
    doctors: '15+ Specialists',
    color: 'green',
  },
  {
    id: 'oncology',
    name: 'Oncology',
    icon: Heart,
    imageId: 'specialty-oncology',
    description: 'Cancer Treatment',
    doctors: '12+ Specialists',
    color: 'orange',
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    icon: Shield,
    imageId: 'specialty-dermatology',
    description: 'Skin & Hair Care',
    doctors: '8+ Specialists',
    color: 'pink',
  },
];

export const SERVICE_FEATURES = [
  {
    icon: Clock,
    title: '24/7 Emergency',
    description: 'Round-the-clock emergency care with advanced life support',
    color: 'blue',
  },
  {
    icon: Shield,
    title: 'Expert Doctors',
    description: 'Highly qualified specialists with years of experience',
    color: 'green',
  },
  {
    icon: Award,
    title: 'Advanced Technology',
    description: 'State-of-the-art medical equipment and facilities',
    color: 'purple',
  },
  {
    icon: Heart,
    title: 'Compassionate Care',
    description: 'Patient-centered approach with personalized treatment',
    color: 'orange',
  },
];

export const HEALTH_PACKAGES = [
  {
    id: 'basic-checkup',
    title: 'Basic Health Checkup',
    price: 1299,
    originalPrice: 1599,
    items: [
      'Complete Blood Count',
      'Blood Sugar',
      'Urine Routine',
      'ECG',
      'Doctor Consultation'
    ],
    imageId: 'health-package-1',
    category: 'basic',
    duration: '2-3 hours',
    popular: false,
  },
  {
    id: 'heart-check',
    title: 'Advanced Heart Check',
    price: 4999,
    originalPrice: 6499,
    items: [
      'Complete Cardiac Profile',
      'TMT',
      '2D Echo',
      'Lipid Profile',
      'Cardiologist Consultation'
    ],
    imageId: 'health-package-2',
    category: 'specialized',
    duration: '4-5 hours',
    popular: true,
  },
  {
    id: 'women-wellness',
    title: 'Women Wellness Package',
    price: 3499,
    originalPrice: 4299,
    items: [
      'Pap Smear',
      'Mammogram',
      'Vitamin D & B12',
      'Thyroid Profile',
      'Gynaecologist Consultation'
    ],
    imageId: 'health-package-3',
    category: 'specialized',
    duration: '3-4 hours',
    popular: false,
  },
];

export const TIME_SLOTS = {
  MORNING: [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'
  ],
  AFTERNOON: [
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ],
  EVENING: [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ],
};

export const APPOINTMENT_STATUS_COLORS = {
  pending: 'yellow',
  confirmed: 'green',
  completed: 'blue',
  cancelled: 'red',
  rescheduled: 'orange',
};