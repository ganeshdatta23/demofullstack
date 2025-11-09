'use client';

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
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Apex Hospitals</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Find a Doctor</span>
          </nav>
          
          <div className="space-y-2">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Find Your Preferred Doctor
            </h1>
            <p className="text-lg text-muted-foreground">
              Search and book appointments with our expert medical professionals
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-10">
          <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Input 
                id="search" 
                placeholder="Search by doctor name, specialty, or condition..." 
                className="pr-12 h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
              />
              <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            
            {/* Filter Options */}
            <div>
              <p className="text-center text-sm text-muted-foreground mb-4">
                Not sure which doctor to consult? Use the filters below to find the right specialist
              </p>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Select>
                  <SelectTrigger className="h-11">
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
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Choose Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Time</SelectItem>
                    <SelectItem value="today">Available Today</SelectItem>
                    <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="h-11 bg-blue-600 hover:bg-blue-700 transition-colors">
                  Search Doctors
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Doctors ({doctors.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Sort by:</span>
              <Select>
                <SelectTrigger className="w-40 h-9">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                  <SelectItem value="fee-low">Fee: Low to High</SelectItem>
                  <SelectItem value="fee-high">Fee: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-10">
            <Button variant="outline" className="px-8">
              Load More Doctors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
