// 'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export async function generateStaticParams() {
  // Return empty array for now - you can add doctor IDs here later
  return [];
}
import { Star, MapPin, Clock, Calendar, Video, Award, Languages, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { layoutClasses, cardVariants } from '@/styles';
import { cn, numberUtils, dateUtils } from '@/lib/utils';
import Link from 'next/link';

const mockDoctor = {
  id: '1',
  name: 'Dr. Rajesh Kumar',
  specialty: 'Cardiology',
  experience: 15,
  rating: 4.8,
  reviewCount: 245,
  consultationFee: 800,
  location: 'Apex Hospital, Chennai Central',
  availableToday: true,
  languages: ['English', 'Tamil', 'Hindi'],
  qualifications: ['MBBS', 'MD Cardiology', 'DM Interventional Cardiology'],
  bio: 'Dr. Rajesh Kumar is a renowned cardiologist with over 15 years of experience in treating complex cardiac conditions.',
  awards: ['Best Cardiologist Award 2023', 'Excellence in Patient Care 2022'],
  specializations: ['Interventional Cardiology', 'Cardiac Catheterization', 'Angioplasty']
};

const mockReviews = [
  {
    id: '1',
    patientName: 'Arun S.',
    rating: 5,
    comment: 'Excellent doctor with great expertise. Very patient and explains everything clearly.',
    date: '2024-01-15',
    verified: true
  }
];

'use client';

export default function DoctorProfilePage() {
  const params = useParams();
  const doctor = mockDoctor;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={layoutClasses.container}>
        <div className="py-8">
          <Card className={cardVariants({ variant: 'elevated' })}>
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <Avatar className="h-32 w-32">
                  <AvatarFallback className="text-2xl">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                  <p className="text-xl text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{doctor.rating} ({doctor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button size="lg" asChild>
                      <Link href={`/appointments/book?doctorId=${doctor.id}`}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg">
                      <Video className="h-4 w-4 mr-2" />
                      Video Call
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {numberUtils.formatCurrency(doctor.consultationFee)}
                  </div>
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="mt-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Qualifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {doctor.qualifications.map((qual, index) => (
                        <Badge key={index} variant="outline">{qual}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Specializations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {doctor.specializations.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {mockReviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{review.patientName}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}