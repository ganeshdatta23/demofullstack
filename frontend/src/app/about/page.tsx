'use client';

import Image from 'next/image';
import { Award, Users, Building, Heart, Shield, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { layoutClasses, cardVariants, typographyClasses } from '@/styles';
import { HOSPITAL_STATISTICS } from '@/constants';
import { cn } from '@/lib/utils';

const achievements = [
  {
    year: '2023',
    title: 'Best Multi-Specialty Hospital',
    organization: 'Healthcare Excellence Awards',
    icon: Award
  },
  {
    year: '2022',
    title: 'Patient Safety Excellence',
    organization: 'National Healthcare Quality Board',
    icon: Shield
  },
  {
    year: '2021',
    title: 'Innovation in Healthcare Technology',
    organization: 'Medical Technology Council',
    icon: Heart
  }
];

const values = [
  {
    title: 'Patient-Centric Care',
    description: 'Every decision we make is centered around our patients\' well-being and comfort.',
    icon: Heart
  },
  {
    title: 'Medical Excellence',
    description: 'We maintain the highest standards of medical practice and continuous learning.',
    icon: Award
  },
  {
    title: '24/7 Availability',
    description: 'Round-the-clock emergency services and critical care support.',
    icon: Clock
  },
  {
    title: 'Ethical Practice',
    description: 'Transparency, integrity, and ethical conduct in all our medical practices.',
    icon: Shield
  }
];

const leadership = [
  {
    name: 'Dr. Suresh Patel',
    position: 'Chief Medical Officer',
    qualification: 'MD, FRCS',
    experience: '25+ years',
    specialty: 'Cardiac Surgery'
  },
  {
    name: 'Dr. Meera Krishnan',
    position: 'Director of Medical Services',
    qualification: 'MD, DM',
    experience: '20+ years',
    specialty: 'Neurology'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className={layoutClasses.container}>
          <div className="max-w-3xl">
            <h1 className={cn(typographyClasses.heading.h1, "text-white mb-6")}>
              About Apex Hospital
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              For over 25 years, Apex Hospital has been at the forefront of healthcare excellence, 
              providing compassionate care and innovative medical solutions to our community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={layoutClasses.section}>
        <div className={layoutClasses.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={cn(typographyClasses.heading.h2, "mb-8")}>Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To provide world-class healthcare services that are accessible, affordable, and 
                delivered with compassion. We are committed to improving the health and well-being 
                of our community through excellence in patient care, medical education, and research.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Comprehensive healthcare services under one roof</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">State-of-the-art medical technology and facilities</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Highly qualified and experienced medical professionals</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-gray-50 py-16">
        <div className={layoutClasses.container}>
          <div className="text-center mb-12">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Our Impact</h2>
            <p className={typographyClasses.body.large}>Numbers that reflect our commitment to healthcare excellence</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(HOSPITAL_STATISTICS).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {typeof value === 'number' ? value.toLocaleString() : value}+
                </div>
                <p className="text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={layoutClasses.section}>
        <div className={layoutClasses.container}>
          <div className="text-center mb-12">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Our Values</h2>
            <p className={typographyClasses.body.large}>The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className={cardVariants({ variant: 'elevated', hover: 'lift' })}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-gray-50 py-16">
        <div className={layoutClasses.container}>
          <div className="text-center mb-12">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Awards & Recognition</h2>
            <p className={typographyClasses.body.large}>Celebrating our commitment to healthcare excellence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className={cardVariants({ variant: 'elevated' })}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">{achievement.year}</Badge>
                      <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm">{achievement.organization}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className={layoutClasses.section}>
        <div className={layoutClasses.container}>
          <div className="text-center mb-12">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Leadership Team</h2>
            <p className={typographyClasses.body.large}>Meet the experts leading our medical excellence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, index) => (
              <Card key={index} className={cardVariants({ variant: 'elevated', hover: 'lift' })}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <h3 className="font-semibold text-xl mb-1">{leader.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{leader.position}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{leader.qualification}</p>
                      <p>{leader.experience} in {leader.specialty}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="bg-gray-50 py-16">
        <div className={layoutClasses.container}>
          <div className="text-center mb-12">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Our Journey</h2>
            <p className={typographyClasses.body.large}>25+ years of healthcare excellence</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                { year: '1998', event: 'Apex Hospital founded with 100 beds' },
                { year: '2005', event: 'Expanded to 500 beds, added cardiac surgery unit' },
                { year: '2012', event: 'Launched telemedicine services' },
                { year: '2018', event: 'Opened advanced cancer treatment center' },
                { year: '2023', event: 'Achieved 2,756 beds across 4 locations' }
              ].map((milestone, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-gray-700">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}