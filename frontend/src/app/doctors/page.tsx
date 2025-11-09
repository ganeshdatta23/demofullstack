import { DoctorCard } from '@/components/doctor/DoctorCard';
import { doctors } from '@/lib/data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function DoctorsPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Apex Hospitals</Link> &gt; Find a Doctor
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Find and select your preferred doctor
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">Search by preferred doctor's name</p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative">
          <Input id="search" placeholder="Search by Doctor..." className="pr-10 h-12 text-base" />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="text-center text-muted-foreground">
          Not sure which doctor to consult? Use the filters below
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Select>
            <SelectTrigger id="location">
              <SelectValue placeholder="Choose Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="secunderabad">Secunderabad</SelectItem>
              <SelectItem value="somajiguda">Somajiguda</SelectItem>
              <SelectItem value="malakpet">Malakpet</SelectItem>
              <SelectItem value="hitec-city">Hitec City</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger id="specialty">
              <SelectValue placeholder="Choose Speciality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full md:w-auto h-10">SEARCH</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Select your preferred doctor's</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}
