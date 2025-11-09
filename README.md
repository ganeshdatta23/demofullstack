# Apex Hospital - Web Application

This is a comprehensive, scalable multi-specialty hospital management and patient engagement platform built with Next.js and Firebase. The application is designed to mirror the functionality and user experience of a modern hospital, supporting patient appointments, doctor discovery, and AI-powered health tools.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14+ with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/), [Shadcn/ui](https://ui.shadcn.com/), and [Tailwind CSS](https://tailwindcss.com/)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) for AI flows
- **Styling**: Tailwind CSS with CSS Variables for theming
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Features Implemented

### 1. Public-Facing Pages
- **Homepage (`/`)**: A comprehensive landing page featuring:
  - A hero section with a call-to-action.
  - A "Why Choose Us" section with hospital statistics.
  - A grid of explorable medical specialities.
  - An AI Symptom Checker call-to-action.
  - A patient testimonials section.
  - Health packages section.
- **Doctor Search (`/doctors`)**: A page for finding and filtering doctors (UI shell).
- **Symptom Checker (`/symptom-checker`)**: An AI-powered tool for users to input symptoms and receive potential diagnoses.

### 2. Authentication
- **Patient Login (`/login/patient`)**: A dedicated login page for patients.
- **Doctor Login (`/login/doctor`)**: A dedicated login page for doctors.
- The header includes a dropdown menu for easy access to both login pages.

### 3. AI Functionality
- **AI Symptom Checker**: A Genkit flow (`src/ai/flows/ai-symptom-checker.ts`) that takes user symptoms and uses a generative model to provide a list of possible diagnoses and a disclaimer.

### 4. Core Components
- **Header**: Sticky header with navigation, dropdown menus, and login access.
- **Footer**: Comprehensive footer with multiple columns and a "Get a Call Back" form.
- **Reusable UI Components**: A rich set of components from `shadcn/ui` located in `src/components/ui`.

## Project Structure

```
.
├── src
│   ├── app                 # Next.js App Router pages
│   │   ├── doctors         # Doctor search page
│   │   ├── login           # Login pages for patient/doctor
│   │   ├── symptom-checker # AI Symptom Checker page
│   │   ├── page.tsx        # Homepage
│   │   └── layout.tsx      # Root layout
│   ├── components          # Reusable React components
│   │   ├── common          # Header, Footer
│   │   ├── home            # Components specific to the homepage
│   │   └── ui              # Shadcn UI components
│   ├── ai                  # Genkit AI flows and configuration
│   │   ├── flows           # AI logic for features
│   │   └── genkit.ts       # Genkit initialization
│   ├── lib                 # Utilities, data, types, and configs
│   │   ├── data.ts         # Mock data for doctors
│   │   ├── placeholder-images.json # Placeholder image data
│   │   └── types.ts        # TypeScript type definitions
│   └── hooks               # Custom React hooks
└── tailwind.config.ts    # Tailwind CSS configuration
```

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

The Genkit development server can be run concurrently:

```bash
npm run genkit:dev
```

This will start the Genkit development UI, allowing you to inspect and test your AI flows.
