import Image from 'next/image';
import Link from 'next/link';
import {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Search,
  ArrowRight,
  Building,
  Bed,
  Stethoscope as StethoscopeIcon,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HealthPackageCard } from '@/components/home/HealthPackageCard';

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
  { name: 'Cardiology', icon: HeartPulse, imageId: 'specialty-cardiology' },
  { name: 'Neurology', icon: Brain, imageId: 'specialty-neurology' },
  { name: 'Orthopedics', icon: Bone, imageId: 'specialty-orthopedics' },
  { name: 'Pediatrics', icon: Baby, imageId: 'specialty-pediatrics' },
  { name: 'Dermatology', icon: (props: any) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v.01"/><path d="M12 12v.01"/><path d="M12 16v.01"/></svg>), imageId: 'specialty-dermatology' },
  { name: 'ENT', icon: (props: any) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 8l-4 4 4 4"/><path d="M17 8l4 4-4 4"/><path d="M3 12h18"/></svg>), imageId: 'specialty-ent' },
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
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-primary/10 to-accent/10 py-24 md:py-32 lg:py-40">
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Compassionate Care, Advanced Medicine
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Find trusted doctors, book appointments, and manage your health journey with Apex Hospital.
              </p>
              <div className="w-full max-w-md space-y-2">
                <form className="flex space-x-2" onSubmit={(e) => { e.preventDefault(); }}>
                  <Input
                    type="search"
                    placeholder="Find a Doctor by name, specialty..."
                    className="flex-1 bg-background"
                    required
                  />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              />
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="w-full bg-background py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Why Choose Apex Hospital?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              A legacy of excellence in healthcare, combining state-of-the-art technology with a human touch.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-8 w-8" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Health Packages Section */}
      <section id="health-packages" className="w-full bg-muted/50 py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Health Packages
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Preventive health check-ups designed for your well-being.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="#">
                View All Health Packages <ArrowRight className="ml-2 h-4 w-4" />
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
                <Card key={specialty.name} className="group overflow-hidden">
                  {specialtyImage && (
                    <Image
                      src={specialtyImage.imageUrl}
                      alt={specialtyImage.description}
                      data-ai-hint={specialtyImage.imageHint}
                      width={400}
                      height={250}
                      className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <specialty.icon className="h-8 w-8 text-primary" />
                      <h3 className="text-lg font-semibold">{specialty.name}</h3>
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
