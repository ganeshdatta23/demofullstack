# Hospital Management System - Frontend

A modern, responsive frontend for the hospital management platform built with Next.js 14+ and TypeScript.

## 🏗️ Architecture

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: Google Gemini for symptom checker
- **State Management**: React Context + Custom hooks
- **Authentication**: JWT with automatic token refresh

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── doctors/           # Doctor listings
│   │   ├── symptom-checker/   # AI symptom checker
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn/ui components
│   │   ├── common/           # Shared components
│   │   ├── home/             # Homepage components
│   │   └── doctor/           # Doctor-related components
│   ├── contexts/             # React contexts
│   │   └── AuthContext.tsx   # Authentication context
│   ├── hooks/                # Custom React hooks
│   │   ├── use-toast.ts      # Toast notifications
│   │   └── use-mobile.tsx    # Mobile detection
│   ├── lib/                  # Utilities and configurations
│   │   ├── api.ts           # API client
│   │   ├── utils.ts         # Utility functions
│   │   └── types.ts         # TypeScript types
│   ├── ai/                   # AI integration
│   │   └── flows/           # Genkit AI flows
│   └── middleware.ts         # Next.js middleware
├── public/                   # Static assets
├── components.json          # Shadcn/ui configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── next.config.ts          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) - Medical trust and professionalism
- **Secondary**: Green (#16a34a) - Health and wellness
- **Accent**: Orange (#ea580c) - Emergency and alerts
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weights
- **Code**: JetBrains Mono for technical content

### Components
Built with Shadcn/ui for consistency and accessibility:
- Buttons with multiple variants
- Form components with validation
- Cards and layouts
- Navigation components
- Modal dialogs and sheets

## 🔧 Key Features

### Homepage
- Modern hero section with quick actions
- Emergency contact banner
- Services overview cards
- Medical specialties showcase
- Health packages display
- AI symptom checker CTA
- Patient testimonials
- Appointment booking form

### Authentication
- Patient and doctor login/signup
- JWT token management
- Automatic token refresh
- Protected routes

### Doctor Discovery
- Advanced search and filtering
- Doctor profiles with specializations
- Availability checking
- Appointment booking

### AI Symptom Checker
- Google Gemini integration
- Natural language processing
- Symptom analysis
- Medical recommendations

## 🔒 Security Features

- Content Security Policy (CSP)
- XSS protection
- CSRF protection
- Secure headers middleware
- Input sanitization
- Authentication guards

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Accessible navigation
- Progressive enhancement

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker build -t hospital-frontend .
docker run -p 3000:3000 hospital-frontend
```

### Vercel Deployment
```bash
npm run build
vercel deploy
```

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `GEMINI_API_KEY`: Google Gemini API key
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Payment gateway key
- `NODE_ENV`: Environment (development/production)

### Next.js Configuration
- Image optimization with WebP/AVIF
- Security headers
- Performance optimizations
- Bundle analysis

## 🎯 Performance

- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting
- Lazy loading
- Caching strategies

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus management
- Semantic HTML

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.