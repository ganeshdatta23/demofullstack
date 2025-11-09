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
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {image && (
        <Image
          src={image.imageUrl}
          alt={image.description}
          data-ai-hint={image.imageHint}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/50 p-4">
        <p className="text-2xl font-bold">
          ₹{price}
        </p>
        <Button>Book Now</Button>
      </CardFooter>
    </Card>
  );
}
