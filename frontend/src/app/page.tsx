import Image from 'next/image';
import Link from 'next/link';
import {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  ArrowRight,
  Building,
  Bed,
  Stethoscope as StethoscopeIcon,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HealthPackageCard } from '@/components/home/HealthPackageCard';
import { SearchForm } from '@/components/home/SearchForm';
import { AppointmentForm } from '@/components/home/AppointmentForm';

// Helper function to get image from placeholder data
const getImage = (id: string) => PlaceHolderImages.find((img) => img.id === id);

const heroImage = getImage('hero');
const symptomCheckerImage = getImage('symptom-checker-cta');

const stats = [
  { icon: Building, value: '4', label: 'Independent Hospitals' },
  { icon: Bed, value: '2,756+', label: 'Beds' },
  { icon: StethoscopeIcon, value: '62+', label: 'Medical Specialities' },
  { icon: User, value: '600+', label: 'Specialist Doctors' },
];

const specialties = [
  { 
    name: 'Cardiology', 
    icon: HeartPulse, 
    imageId: 'specialty-cardiology',
    description: 'Heart & Vascular Care',
    doctors: '25+ Specialists'
  },
  { 
    name: 'Neurology', 
    icon: Brain, 
    imageId: 'specialty-neurology',
    description: 'Brain & Nervous System',
    doctors: '18+ Specialists'
  },
  { 
    name: 'Orthopedics', 
    icon: Bone, 
    imageId: 'specialty-orthopedics',
    description: 'Bone & Joint Care',
    doctors: '22+ Specialists'
  },
  { 
    name: 'Pediatrics', 
    icon: Baby, 
    imageId: 'specialty-pediatrics',
    description: 'Child Healthcare',
    doctors: '15+ Specialists'
  },
  { 
    name: 'Oncology', 
    icon: (props: any) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>), 
    imageId: 'specialty-oncology',
    description: 'Cancer Treatment',
    doctors: '12+ Specialists'
  },
  { 
    name: 'Dermatology', 
    icon: (props: any) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v.01"/><path d="M12 12v.01"/><path d="M12 16v.01"/></svg>), 
    imageId: 'specialty-dermatology',
    description: 'Skin & Hair Care',
    doctors: '8+ Specialists'
  }
];

const healthPackages = [
  {
    title: 'Basic Health Checkup',
    price: '1299',
    items: ['Complete Blood Count', 'Blood Sugar', 'Urine Routine', 'ECG', 'Doctor Consultation'],
    imageId: 'health-package-1',
  },
  {
    title: 'Advanced Heart Check',
    price: '4999',
    items: ['Complete Cardiac Profile', 'TMT', '2D Echo', 'Lipid Profile', 'Cardiologist Consultation'],
    imageId: 'health-package-2',
  },
  {
    title: 'Women Wellness Package',
    price: '3499',
    items: ['Pap Smear', 'Mammogram', 'Vitamin D & B12', 'Thyroid Profile', 'Gynaecologist Consultation'],
    imageId: 'health-package-3',
  },
];

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

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">🚨 Emergency? Call 108 | Ambulance: +91-40-4455-4455</span>
            <Button variant="outline" size="sm" className="text-red-600 border-white hover:bg-white hover:text-red-600">
              Emergency Services
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 md:py-16 lg:py-24 overflow-hidden">
        <div className="container relative z-10 max-w-full px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-12">
            <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
              <div className="space-y-3 lg:space-y-4">
                <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs sm:text-sm font-medium text-blue-800">
                  <span className="hidden sm:inline">⭐ Rated #1 Multi-Specialty Hospital in Chennai</span>
                  <span className="sm:hidden">⭐ #1 Hospital Chennai</span>
                </div>
                <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
                  Your Health, Our
                  <span className="text-blue-600"> Priority</span>
                </h1>
                <p className="max-w-full text-sm sm:text-base lg:text-lg text-muted-foreground">
                  Healthcare with 24/7 emergency services for everyone, expert doctors, and cutting-edge technology. Your wellness journey starts here.
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                  Book Appointment
                </Button>
                <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                  Find a Doctor
                </Button>
                <Button size="sm" variant="outline" className="text-xs sm:text-sm hidden sm:inline-flex">
                  Health Packages
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
        </div>
      </section>

      {/* Services Overview */}
      <section className="w-full py-12 md:py-16 bg-white overflow-hidden">
        <div className="container max-w-full px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="text-center p-4 md:p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-sm md:text-base">24/7 Emergency</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Round-the-clock emergency care with advanced life support</p>
            </Card>
            
            <Card className="text-center p-4 md:p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-sm md:text-base">Expert Doctors</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Highly qualified specialists with years of experience</p>
            </Card>
            
            <Card className="text-center p-4 md:p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-sm md:text-base">Advanced Technology</h3>
              <p className="text-xs md:text-sm text-muted-foreground">State-of-the-art medical equipment and facilities</p>
            </Card>
            
            <Card className="text-center p-4 md:p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-sm md:text-base">Compassionate Care</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Patient-centered approach with personalized treatment</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="w-full bg-background py-12 md:py-16 lg:py-24 overflow-hidden">
        <div className="container max-w-full px-4 md:px-6">
          <div className="mb-8 md:mb-12 flex flex-col items-center justify-center space-y-3 md:space-y-4 text-center">
            <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Why Choose Apex Hospital?
            </h2>
            <p className="max-w-full text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              A legacy of excellence in healthcare, combining state-of-the-art technology with a human touch.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Health Packages Section */}
      <section id="health-packages" className="w-full bg-muted/50 py-12 md:py-16 lg:py-24 overflow-hidden">
        <div className="container max-w-full px-4 md:px-6">
          <div className="mb-8 md:mb-12 flex flex-col items-center justify-center space-y-3 md:space-y-4 text-center">
            <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Health Packages
            </h2>
            <p className="max-w-full text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              Preventive health check-ups designed for your well-being.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {healthPackages.map((pkg, index) => {
              const packageImage = getImage(pkg.imageId);
              return (
                <HealthPackageCard
                  key={index}
                  title={pkg.title}
                  price={pkg.price}
                  items={pkg.items}
                  image={packageImage}
                />
              );
            })}
          </div>
          <div className="mt-8 md:mt-12 text-center">
            <Button asChild size="sm" variant="outline" className="text-xs sm:text-sm">
              <Link href="#">
                <span className="hidden sm:inline">View All Health Packages</span>
                <span className="sm:hidden">View All Packages</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Explore Our Specialties
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Access world-class care across a wide range of medical specialties.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((specialty) => {
              const specialtyImage = getImage(specialty.imageId);
              return (
                <Card key={specialty.name} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  {specialtyImage && (
                    <div className="relative overflow-hidden">
                      <Image
                        src={specialtyImage.imageUrl}
                        alt={specialtyImage.description}
                        data-ai-hint={specialtyImage.imageHint}
                        width={400}
                        height={200}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                      <Button variant="outline" size="sm" className="mt-3 w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        View Doctors
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Symptom Checker CTA */}
      <section id="symptom-checker" className="w-full bg-muted/50 py-16 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              AI-Powered
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Unsure About Your Symptoms?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Use our intelligent Symptom Checker to get instant, AI-driven insights into potential
              conditions. It's a first step towards understanding your health better.
            </p>
            <p className="text-xs text-muted-foreground">
              Disclaimer: This tool is for informational purposes only and is not a substitute for
              professional medical advice.
            </p>
            <Button asChild size="lg">
              <Link href="/symptom-checker">
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
      </section>

      {/* Appointment Booking CTA */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="text-white space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Book Your Appointment Today
              </h2>
              <p className="text-lg text-blue-100">
                Skip the wait. Book online appointments with our expert doctors and get the care you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Book Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Call +91-44-4455-4455
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
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-background py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Patients Say
            </h2>
          </div>
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
        </div>
      </section>
    </div>
  );
}
