'use client';

import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Doctor } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

type DoctorCardProps = {
  doctor: Doctor;
};

const getImage = (id: string) => PlaceHolderImages.find((img) => img.id === id);

export function DoctorCard({ doctor }: DoctorCardProps) {
  const doctorImage = getImage(doctor.imageId);

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {doctorImage && (
            <div className="relative">
              <Image
                src={doctorImage.imageUrl}
                alt={doctorImage.description}
                data-ai-hint={doctorImage.imageHint}
                width={120}
                height={120}
                className="aspect-square rounded-full object-cover ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all"
              />
              <Badge 
                variant="secondary" 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 border-green-200"
              >
                Available Today
              </Badge>
            </div>
          )}
          
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {doctor.name}
            </CardTitle>
            <CardDescription className="text-blue-600 font-medium">
              {doctor.specialty}
            </CardDescription>
            <p className="text-sm text-muted-foreground">
              {doctor.experience} years experience
            </p>
          </div>

          <div className="flex items-center justify-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{doctor.rating}</span>
            <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm bg-gray-50 rounded-lg p-3 w-full">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Onsite</p>
              <p className="font-semibold text-gray-900">₹{doctor.consultationFeeOnsite}</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Online</p>
              <p className="font-semibold text-gray-900">₹{doctor.consultationFeeOnline}</p>
            </div>
          </div>

          <div className="flex gap-2 w-full pt-2">
            <Button variant="outline" className="flex-1 group-hover:border-blue-600 group-hover:text-blue-600 transition-colors" asChild>
              <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors">
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
