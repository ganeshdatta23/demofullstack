'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

type HealthPackageCardProps = {
  title: string;
  price: string;
  items: string[];
  image?: ImagePlaceholder;
};

export function HealthPackageCard({ title, price, items, image }: HealthPackageCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md">
      {image && (
        <div className="relative overflow-hidden">
          <Image
            src={image.imageUrl}
            alt={image.description}
            data-ai-hint={image.imageHint}
            width={400}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      
      <div className="flex flex-col flex-grow">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow pb-4">
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter className="bg-gradient-to-r from-blue-50 to-green-50 border-t p-6 mt-auto">
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{price}
              </p>
            </div>
            <Button 
              onClick={() => console.log('Booking:', title)}
              className="bg-blue-600 hover:bg-blue-700 transition-colors px-6"
            >
              Book Package
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
