'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HealthPackageCard } from '@/components/home/HealthPackageCard';
import { SearchForm } from '@/components/home/SearchForm';
import { AppointmentForm } from '@/components/home/AppointmentForm';
import { 
  HOSPITAL_STATISTICS, 
  MEDICAL_SPECIALTIES, 
  SERVICE_FEATURES, 
  HEALTH_PACKAGES,
  ROUTES 
} from '@/constants';
import { 
  layoutClasses, 
  typographyClasses, 
  spacingClasses, 
  cardVariants,
  medicalClasses 
} from '@/styles';
import { cn } from '@/lib/utils';

// Helper function to get image from placeholder data
const getImage = (id: string) => PlaceHolderImages.find((img) => img.id === id);

const heroImage = getImage('hero');
const symptomCheckerImage = getImage('symptom-checker-cta');

const testimonials = [
  {
    name: 'Sarah L.',
    text: 'Booking an appointment was incredibly easy. The platform is so user-friendly, and I found a great doctor near me in minutes.',
    avatarId: 'avatar-1',
  },
  {
    name: 'Michael B.',
    text: "The AI symptom checker gave me peace of mind and helped me decide to see a specialist. It's a fantastic feature!",
    avatarId: 'avatar-2',
  },
];

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ children, className, id }: SectionProps) => (
  <section id={id} className={cn(layoutClasses.section, className)}>
    {children}
  </section>
);

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(layoutClasses.container, className)}>
    {children}
  </div>
);

const SectionHeader = ({ 
  title, 
  subtitle, 
  className 
}: { 
  title: string; 
  subtitle?: string; 
  className?: string;
}) => (
  <div className={cn("mb-8 md:mb-12 flex flex-col items-center justify-center space-y-3 md:space-y-4 text-center", className)}>
    <h2 className={typographyClasses.heading.h2}>
      {title}
    </h2>
    {subtitle && (
      <p className={cn(typographyClasses.body.large, "max-w-full px-4")}>
        {subtitle}
      </p>
    )}
  </div>
);

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Emergency Banner */}
      <div className={medicalClasses.emergency.banner}>
        <Container>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">🚨 Emergency? Call 108 | Ambulance: +91-40-4455-4455</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 border-white hover:bg-white hover:text-red-600"
            >
              Emergency Services
            </Button>
          </div>
        </Container>
      </div>

      {/* Hero Section */}
      <Section className="relative w-full bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <Container className="relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-12">
            <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
              <div className="space-y-3 lg:space-y-4">
                <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs sm:text-sm font-medium text-blue-800">
                  <span className="hidden sm:inline">⭐ Rated #1 Multi-Specialty Hospital in Chennai</span>
                  <span className="sm:hidden">⭐ #1 Hospital Chennai</span>
                </div>
                <h1 className={cn(typographyClasses.heading.h1, "font-headline")}>
                  Your Health, Our
                  <span className="text-blue-600"> Priority</span>
                </h1>
                <p className={cn(typographyClasses.body.large, "max-w-full")}>
                  Healthcare with 24/7 emergency services for everyone, expert doctors, and cutting-edge technology. Your wellness journey starts here.
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                  <Link href={ROUTES.BOOK_APPOINTMENT}>
                    Book Appointment
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="text-xs sm:text-sm">
                  <Link href={ROUTES.DOCTORS}>
                    Find a Doctor
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="text-xs sm:text-sm hidden sm:inline-flex">
                  <Link href={ROUTES.HEALTH_PACKAGES}>
                    Health Packages
                  </Link>
                </Button>
              </div>
              
              {/* Search Bar */}
              <SearchForm />
            </div>
            
            <div className="relative">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  width={600}
                  height={400}
                  className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover shadow-2xl sm:w-full"
                />
              )}
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">25+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Patients</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Overview */}
      <Section className="w-full bg-white overflow-hidden">
        <Container>
          <div className={layoutClasses.grid.features}>
            {SERVICE_FEATURES.map((feature, index) => (
              <Card key={index} className={cn(cardVariants({ variant: 'elevated', hover: 'lift' }), "text-center")}>
                <CardContent className="p-4 md:p-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}>
                    <feature.icon className={`w-5 h-5 md:w-6 md:h-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="font-semibold mb-2 text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section id="why-choose-us" className="w-full bg-background overflow-hidden">
        <Container>
          <SectionHeader
            title="Why Choose Apex Hospital?"
            subtitle="A legacy of excellence in healthcare, combining state-of-the-art technology with a human touch."
          />
          <div className="mx-auto grid max-w-6xl items-center gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {Object.entries(HOSPITAL_STATISTICS).map(([key, value], index) => {
              const icons = {
                hospitals: '🏥',
                beds: '🛏️',
                specialties: '🩺',
                doctors: '👨‍⚕️'
              };
              
              return (
                <div key={key} className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    {icons[key as keyof typeof icons]}
                  </div>
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold">
                    {typeof value === 'number' ? value.toLocaleString() : value}+
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
      
      {/* Health Packages Section */}
      <Section id="health-packages" className="w-full bg-muted/50 overflow-hidden">
        <Container>
          <SectionHeader
            title="Health Packages"
            subtitle="Preventive health check-ups designed for your well-being."
          />
          <div className={layoutClasses.grid.responsive}>
            {HEALTH_PACKAGES.map((pkg, index) => {
              const packageImage = getImage(pkg.imageId);
              return (
                <HealthPackageCard
                  key={pkg.id}
                  title={pkg.title}
                  price={pkg.price.toString()}
                  items={pkg.items}
                  image={packageImage}
                />
              );
            })}
          </div>
          <div className="mt-8 md:mt-12 text-center">
            <Button asChild size="sm" variant="outline" className="text-xs sm:text-sm">
              <Link href={ROUTES.HEALTH_PACKAGES}>
                <span className="hidden sm:inline">View All Health Packages</span>
                <span className="sm:hidden">View All Packages</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Specialties Section */}
      <Section id="specialties" className="w-full">
        <Container>
          <SectionHeader
            title="Explore Our Specialties"
            subtitle="Access world-class care across a wide range of medical specialties."
          />
          <div className={layoutClasses.grid.responsive}>
            {MEDICAL_SPECIALTIES.map((specialty) => {
              const specialtyImage = getImage(specialty.imageId);
              return (
                <Card key={specialty.id} className={medicalClasses.specialty.card}>
                  {specialtyImage && (
                    <div className="relative overflow-hidden">
                      <Image
                        src={specialtyImage.imageUrl}
                        alt={specialtyImage.description}
                        data-ai-hint={specialtyImage.imageHint}
                        width={400}
                        height={200}
                        className={medicalClasses.specialty.image}
                      />
                      <div className={medicalClasses.specialty.overlay} />
                      <div className="absolute bottom-4 left-4 text-white">
                        <specialty.icon className="h-8 w-8 mb-2" />
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">{specialty.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{specialty.description}</p>
                      <p className="text-xs text-muted-foreground">{specialty.doctors}</p>
                      <Button 
                        asChild
                        variant="outline" 
                        size="sm" 
                        className="mt-3 w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                      >
                        <Link href={`/specialties/${specialty.id}`}>
                          View Doctors
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* AI Symptom Checker CTA */}
      <Section id="symptom-checker" className="w-full bg-muted/50">
        <Container>
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                AI-Powered
              </div>
              <h2 className={cn(typographyClasses.heading.h2, "font-headline")}>
                Unsure About Your Symptoms?
              </h2>
              <p className={cn(typographyClasses.body.large, "max-w-[600px]")}>
                Use our intelligent Symptom Checker to get instant, AI-driven insights into potential
                conditions. It's a first step towards understanding your health better.
              </p>
              <p className="text-xs text-muted-foreground">
                Disclaimer: This tool is for informational purposes only and is not a substitute for
                professional medical advice.
              </p>
              <Button asChild size="lg">
                <Link href={ROUTES.SYMPTOM_CHECKER}>
                  Check Your Symptoms <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {symptomCheckerImage && (
              <Image
                src={symptomCheckerImage.imageUrl}
                alt={symptomCheckerImage.description}
                data-ai-hint={symptomCheckerImage.imageHint}
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            )}
          </div>
        </Container>
      </Section>

      {/* Appointment Booking CTA */}
      <Section className="w-full bg-gradient-to-r from-blue-600 to-blue-800">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="text-white space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Book Your Appointment Today
              </h2>
              <p className="text-lg text-blue-100">
                Skip the wait. Book online appointments with our expert doctors and get the care you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href={ROUTES.BOOK_APPOINTMENT}>
                    Book Now
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Link href="tel:+914445544455">
                    Call +91-44-4455-4455
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Same Day Appointments
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Video Consultations
                </div>
              </div>
            </div>
            <AppointmentForm />
          </div>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section className="w-full bg-background">
        <Container>
          <SectionHeader title="What Our Patients Say" />
          <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
            {testimonials.map((testimonial, index) => {
              const avatarImage = getImage(testimonial.avatarId);
              return (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="p-6">
                    <p className="mb-4 text-muted-foreground">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      {avatarImage && (
                        <Avatar>
                          <AvatarImage
                            src={avatarImage.imageUrl}
                            alt={avatarImage.description}
                            data-ai-hint={avatarImage.imageHint}
                          />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}