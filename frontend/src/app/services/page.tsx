'use client';

import { Heart, Brain, Bone, Baby, Eye, Ear, Lungs, Kidney } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { layoutClasses, cardVariants, typographyClasses } from '@/styles';
import { MEDICAL_SPECIALTIES } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const emergencyServices = [
  {
    title: '24/7 Emergency Department',
    description: 'Round-the-clock emergency care with advanced life support systems',
    features: ['Trauma Care', 'Cardiac Emergency', 'Stroke Unit', 'Poison Control']
  },
  {
    title: 'Ambulance Services',
    description: 'Advanced life support ambulances with trained paramedics',
    features: ['GPS Tracking', 'ICU on Wheels', 'Air Ambulance', 'Neonatal Transport']
  },
  {
    title: 'Critical Care Units',
    description: 'State-of-the-art ICU facilities with 24/7 monitoring',
    features: ['Medical ICU', 'Surgical ICU', 'Cardiac ICU', 'Neonatal ICU']
  }
];

const diagnosticServices = [
  {
    category: 'Imaging Services',
    services: ['MRI Scan', 'CT Scan', 'X-Ray', 'Ultrasound', 'Mammography', 'PET Scan']
  },
  {
    category: 'Laboratory Services',
    services: ['Blood Tests', 'Urine Analysis', 'Pathology', 'Microbiology', 'Biochemistry', 'Genetics']
  },
  {
    category: 'Cardiac Diagnostics',
    services: ['ECG', 'Echocardiogram', 'Stress Test', 'Holter Monitor', 'Angiography']
  },
  {
    category: 'Specialized Tests',
    services: ['Endoscopy', 'Colonoscopy', 'Biopsy', 'Pulmonary Function', 'Sleep Study']
  }
];

const surgicalServices = [
  {
    title: 'Minimally Invasive Surgery',
    description: 'Advanced laparoscopic and robotic surgical procedures',
    specialties: ['Laparoscopic Surgery', 'Robotic Surgery', 'Endoscopic Procedures']
  },
  {
    title: 'Cardiac Surgery',
    description: 'Comprehensive heart surgery including bypass and valve procedures',
    specialties: ['Bypass Surgery', 'Valve Replacement', 'Angioplasty', 'Pacemaker']
  },
  {
    title: 'Neurosurgery',
    description: 'Advanced brain and spine surgical procedures',
    specialties: ['Brain Surgery', 'Spine Surgery', 'Tumor Removal', 'Trauma Surgery']
  },
  {
    title: 'Orthopedic Surgery',
    description: 'Joint replacement and sports medicine procedures',
    specialties: ['Joint Replacement', 'Sports Medicine', 'Trauma Care', 'Arthroscopy']
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className={layoutClasses.container}>
          <div className="max-w-3xl">
            <h1 className={cn(typographyClasses.heading.h1, "text-white mb-6")}>
              Our Medical Services
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Comprehensive healthcare services delivered by expert medical professionals 
              using state-of-the-art technology and compassionate care.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className={layoutClasses.section}>
        <div className={layoutClasses.container}>
          <div className="text-center mb-12">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Emergency Services</h2>
            <p className={typographyClasses.body.large}>24/7 emergency care when you need it most</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyServices.map((service, index) => (
              <Card key={index} className={cardVariants({ variant: 'elevated', hover: 'lift' })}>
                <CardHeader>
                  <CardTitle className="text-red-600">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Specialties */}
      <section className="bg-gray-50 py-16">
        <div className={layoutClasses.container}>
          <div className="text-center mb-12">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Medical Specialties</h2>
            <p className={typographyClasses.body.large}>Expert care across multiple medical disciplines</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEDICAL_SPECIALTIES.map((specialty) => (
              <Card key={specialty.id} className={cardVariants({ variant: 'elevated', hover: 'lift' })}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-${specialty.color}-100 rounded-full flex items-center justify-center`}>
                      <specialty.icon className={`h-6 w-6 text-${specialty.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{specialty.name}</h3>
                      <p className="text-sm text-gray-600">{specialty.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{specialty.doctors}</Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/doctors?specialty=${specialty.name}`}>
                        View Doctors
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Services */}
      <section className={layoutClasses.section}>
        <div className={layoutClasses.container}>
          <div className="text-center mb-12">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Diagnostic Services</h2>
            <p className={typographyClasses.body.large}>Advanced diagnostic capabilities for accurate diagnosis</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diagnosticServices.map((category, index) => (
              <Card key={index} className={cardVariants({ variant: 'elevated' })}>
                <CardHeader>
                  <CardTitle className="text-blue-600">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {category.services.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Surgical Services */}
      <section className="bg-gray-50 py-16">
        <div className={layoutClasses.container}>
          <div className="text-center mb-12">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Surgical Services</h2>
            <p className={typographyClasses.body.large}>Advanced surgical procedures with minimal invasive techniques</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {surgicalServices.map((service, index) => (
              <Card key={index} className={cardVariants({ variant: 'elevated', hover: 'lift' })}>
                <CardHeader>
                  <CardTitle className="text-green-600">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.specialties.map((specialty, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Health Packages */}
      <section className={layoutClasses.section}>
        <div className={layoutClasses.container}>
          <div className="text-center mb-12">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Health Packages</h2>
            <p className={typographyClasses.body.large}>Comprehensive health check-ups for preventive care</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={cardVariants({ variant: 'elevated', hover: 'lift' })}>
              <CardHeader>
                <CardTitle>Basic Health Checkup</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-4">₹1,299</div>
                <ul className="space-y-2 text-sm">
                  <li>• Complete Blood Count</li>
                  <li>• Blood Sugar Test</li>
                  <li>• Urine Routine</li>
                  <li>• ECG</li>
                  <li>• Doctor Consultation</li>
                </ul>
                <Button className="w-full mt-4">Book Package</Button>
              </CardContent>
            </Card>

            <Card className={cardVariants({ variant: 'elevated', hover: 'lift' })}>
              <CardHeader>
                <CardTitle>Executive Health Checkup</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-4">₹4,999</div>
                <ul className="space-y-2 text-sm">
                  <li>• Complete Blood Profile</li>
                  <li>• Cardiac Profile</li>
                  <li>• Liver Function Test</li>
                  <li>• Kidney Function Test</li>
                  <li>• Chest X-Ray</li>
                  <li>• Specialist Consultation</li>
                </ul>
                <Button className="w-full mt-4">Book Package</Button>
              </CardContent>
            </Card>

            <Card className={cardVariants({ variant: 'elevated', hover: 'lift' })}>
              <CardHeader>
                <CardTitle>Women's Health Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-4">₹3,499</div>
                <ul className="space-y-2 text-sm">
                  <li>• Pap Smear</li>
                  <li>• Mammography</li>
                  <li>• Bone Density Test</li>
                  <li>• Thyroid Profile</li>
                  <li>• Vitamin D & B12</li>
                  <li>• Gynecologist Consultation</li>
                </ul>
                <Button className="w-full mt-4">Book Package</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className={layoutClasses.container}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Need Medical Assistance?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Our medical experts are available 24/7 to provide you with the best healthcare services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Book Appointment
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Emergency: 108
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}