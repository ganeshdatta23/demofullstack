# Apex Hospital - Coding Style Guide

## Project Architecture

### File Organization
```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # Shadcn/ui components
│   ├── common/            # Shared components (Header, Footer)
│   ├── pages/             # Page-specific components
│   └── [feature]/         # Feature-specific components
├── constants/             # Application constants
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
├── styles/                # Centralized style system
├── types/                 # TypeScript type definitions
└── contexts/              # React contexts
```

## Import Organization

### Import Order (Always follow this order)
```typescript
// 1. React and Next.js imports
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 2. Third-party libraries
import { ArrowRight, Calendar } from 'lucide-react';

// 3. UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// 4. Internal components
import { Header } from '@/components/common/Header';
import { SearchForm } from '@/components/home/SearchForm';

// 5. Constants and configurations
import { ROUTES, NAVIGATION_ITEMS } from '@/constants';

// 6. Styles (ALWAYS use centralized system)
import { layoutClasses, spacingClasses, typographyClasses } from '@/styles';

// 7. Utilities and types
import { cn } from '@/lib/utils';
import type { User, Doctor } from '@/types';
```

## Style System Usage

### ✅ ALWAYS Use Centralized Styles
```typescript
// ✅ Correct - Use centralized style classes
import { layoutClasses, spacingClasses } from '@/styles';

<div className={cn(layoutClasses.flex.center, spacingClasses.padding.md)}>
  <h1 className={typographyClasses.heading.h1}>Title</h1>
</div>
```

### ❌ NEVER Use Hardcoded Classes
```typescript
// ❌ Wrong - Don't use hardcoded Tailwind classes
<div className="flex items-center justify-center p-6">
  <h1 className="text-4xl font-bold">Title</h1>
</div>
```

### Responsive Design
```typescript
// ✅ Use responsive classes from style system
import { responsiveClasses } from '@/styles';

// Hide on tablet and below, show on desktop
<nav className={responsiveClasses.hide.tablet}>
  {/* Desktop navigation */}
</nav>

// Show on tablet and below, hide on desktop  
<div className={responsiveClasses.show.tablet}>
  {/* Mobile menu */}
</div>
```

## Component Structure

### Component Template
```typescript
'use client'; // Only if needed (client-side features)

// Imports (follow import order above)
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { layoutClasses } from '@/styles';
import { cn } from '@/lib/utils';

// Types (define interfaces before component)
interface ComponentProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

// Component
export function ComponentName({ title, children, className }: ComponentProps) {
  const [state, setState] = useState(false);

  return (
    <div className={cn(layoutClasses.container, className)}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
```

### Component Naming
- **PascalCase** for components: `UserProfile`, `AppointmentCard`
- **camelCase** for functions and variables: `handleSubmit`, `isLoading`
- **UPPER_SNAKE_CASE** for constants: `API_ENDPOINTS`, `VALIDATION_RULES`

## TypeScript Guidelines

### Type Definitions
```typescript
// ✅ Define types in /src/types/ directory
// /src/types/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin'
}
```

### Props Interface
```typescript
// ✅ Always define props interface
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // Always include for style flexibility
}
```

## Constants Management

### Centralized Constants
```typescript
// ✅ Store in /src/constants/ directory
// /src/constants/routes.constants.ts
export const ROUTES = {
  HOME: '/',
  DOCTORS: '/doctors',
  LOGIN: {
    PATIENT: '/login/patient',
    DOCTOR: '/login/doctor'
  }
} as const;
```

### Usage
```typescript
// ✅ Import and use constants
import { ROUTES } from '@/constants';

<Link href={ROUTES.LOGIN.PATIENT}>Patient Login</Link>
```

## State Management

### useState Pattern
```typescript
// ✅ Descriptive state names
const [isLoading, setIsLoading] = useState(false);
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

// ✅ Update patterns
setFormData(prev => ({ ...prev, email: value }));
```

### Custom Hooks
```typescript
// ✅ Create reusable hooks in /src/hooks/
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hook logic...

  return { user, isLoading, login, logout };
}
```

## Event Handlers

### Naming Convention
```typescript
// ✅ Use handle prefix
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Handle form submission
};

const handleInputChange = (value: string) => {
  setFormData(prev => ({ ...prev, email: value }));
};
```

## Styling Guidelines

### Class Name Composition
```typescript
// ✅ Use cn() utility for combining classes
import { cn } from '@/lib/utils';

<div className={cn(
  layoutClasses.flex.center,
  spacingClasses.padding.md,
  "bg-white rounded-lg", // Additional classes if needed
  className // Always allow className override
)}>
```

### Responsive Breakpoints
```typescript
// ✅ Use consistent breakpoints
// sm: 640px (mobile landscape)
// md: 768px (tablet)  
// lg: 1024px (desktop)
// xl: 1280px (large desktop)
// 2xl: 1536px (extra large)

// Hide on tablet and below
className={responsiveClasses.hide.tablet} // hidden xl:block
```

## Form Handling

### Form Structure
```typescript
const [formData, setFormData] = useState({
  email: '',
  password: ''
});
const [errors, setErrors] = useState<Record<string, string>>({});

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  
  if (!formData.email) {
    newErrors.email = 'Email is required';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;
  
  // Submit logic
};
```

## Performance Guidelines

### Component Optimization
```typescript
// ✅ Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }: Props) => {
  // Component logic
});

// ✅ Use useCallback for event handlers
const handleClick = useCallback(() => {
  // Handler logic
}, [dependency]);

// ✅ Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

## Accessibility

### ARIA and Semantic HTML
```typescript
// ✅ Use semantic HTML and ARIA labels
<button 
  aria-label="Close dialog"
  onClick={handleClose}
>
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>
</button>

<nav aria-label="Main navigation">
  {/* Navigation items */}
</nav>
```

## File Naming

### Naming Conventions
- **Components**: `PascalCase.tsx` → `UserProfile.tsx`
- **Pages**: `kebab-case/page.tsx` → `user-profile/page.tsx`
- **Hooks**: `camelCase.ts` → `useAuth.ts`
- **Types**: `kebab-case.types.ts` → `user-profile.types.ts`
- **Constants**: `kebab-case.constants.ts` → `api-endpoints.constants.ts`
- **Utilities**: `kebab-case.ts` → `date-utils.ts`

## Git Commit Messages

### Commit Format
```
type(scope): description

feat(auth): add patient login functionality
fix(header): resolve dropdown z-index issue  
style(components): update to use centralized style system
docs(readme): add deployment instructions
refactor(utils): extract common validation functions
```

## Code Review Checklist

### Before Submitting PR
- [ ] Uses centralized style system (`@/styles`)
- [ ] Follows import order
- [ ] Includes TypeScript types
- [ ] Uses constants from `@/constants`
- [ ] Handles loading and error states
- [ ] Includes accessibility attributes
- [ ] Responsive design implemented
- [ ] No hardcoded strings or magic numbers
- [ ] Proper error handling
- [ ] Component is properly typed

## Don'ts - Common Mistakes to Avoid

### ❌ Style Anti-patterns
```typescript
// ❌ Don't use hardcoded Tailwind classes
<div className="flex items-center justify-center p-6">

// ❌ Don't create inline styles
<div style={{ padding: '24px', display: 'flex' }}>

// ❌ Don't use magic numbers
setTimeout(callback, 5000); // What is 5000?
```

### ❌ Component Anti-patterns
```typescript
// ❌ Don't use any type
const handleData = (data: any) => { }

// ❌ Don't mutate props directly
props.user.name = 'New Name';

// ❌ Don't use index as key in dynamic lists
{items.map((item, index) => <Item key={index} />)}
```

This style guide ensures consistency, maintainability, and scalability across the Apex Hospital codebase.