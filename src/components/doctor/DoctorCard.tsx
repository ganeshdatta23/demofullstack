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
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="p-6 text-center">
        {doctorImage && (
          <Image
            src={doctorImage.imageUrl}
            alt={doctorImage.description}
            data-ai-hint={doctorImage.imageHint}
            width={128}
            height={128}
            className="mx-auto mb-4 aspect-square rounded-full object-cover"
          />
        )}
        <CardTitle className="text-xl">{doctor.name}</CardTitle>
        <CardDescription className="mb-2">{doctor.specialty}</CardDescription>
        <p className="text-sm text-muted-foreground mb-2">{doctor.experience} years experience</p>
        <div className="flex items-center justify-center gap-1 text-sm mb-4">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{doctor.rating}</span>
          <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
        </div>
        <div className="text-sm mb-4">
            <p>Onsite: <span className="font-semibold">₹{doctor.consultationFeeOnsite}</span></p>
            <p>Online: <span className="font-semibold">₹{doctor.consultationFeeOnline}</span></p>
        </div>
        <Badge variant="secondary" className="mb-4">Available Today</Badge>
        <div className="flex gap-2">
            <Button variant="outline" className="flex-1" asChild>
                <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
            </Button>
            <Button className="flex-1">Book Appointment</Button>
        </div>
      </CardContent>
    </Card>
  );
}
