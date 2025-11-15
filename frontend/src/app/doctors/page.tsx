'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, Star, Clock, Video, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApi, useApiSearch } from '@/hooks/useApi';
import { MEDICAL_SPECIALTIES } from '@/constants';
import { layoutClasses, cardVariants } from '@/styles';
import { cn, numberUtils } from '@/lib/utils';
import Link from 'next/link';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  location: string;
  availableToday: boolean;
  profileImage?: string;
  languages: string[];
  qualifications: string[];
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Cardiology',
    experience: 15,
    rating: 4.8,
    reviewCount: 245,
    consultationFee: 800,
    location: 'Chennai Central',
    availableToday: true,
    languages: ['English', 'Tamil', 'Hindi'],
    qualifications: ['MBBS', 'MD Cardiology', 'DM Interventional Cardiology']
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    specialty: 'Neurology',
    experience: 12,
    rating: 4.9,
    reviewCount: 189,
    consultationFee: 900,
    location: 'Chennai South',
    availableToday: false,
    languages: ['English', 'Tamil'],
    qualifications: ['MBBS', 'MD Neurology', 'Fellowship in Epilepsy']
  }
];

export default function DoctorsPage() {
  const [filters, setFilters] = useState({
    specialty: '',
    location: '',
    availableToday: false,
    sortBy: 'rating'
  });

  const { query, setQuery, results, loading } = useApiSearch<Doctor>('/api/v1/doctors/search');

  const filteredDoctors = mockDoctors.filter(doctor => {
    if (filters.specialty && doctor.specialty !== filters.specialty) return false;
    if (filters.location && !doctor.location.includes(filters.location)) return false;
    if (filters.availableToday && !doctor.availableToday) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className={layoutClasses.container}>
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Doctors</h1>
            <p className="text-gray-600">Book appointments with our expert doctors</p>
          </div>
        </div>
      </div>

      <div className={layoutClasses.container}>
        <div className="py-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search doctors..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filters.specialty} onValueChange={(value) => setFilters(prev => ({ ...prev, specialty: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Specialties</SelectItem>
                  {MEDICAL_SPECIALTIES.map(specialty => (
                    <SelectItem key={specialty.id} value={specialty.name}>
                      {specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="Central">Chennai Central</SelectItem>
                  <SelectItem value="South">Chennai South</SelectItem>
                  <SelectItem value="North">Chennai North</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="fee">Consultation Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.availableToday}
                  onChange={(e) => setFilters(prev => ({ ...prev, availableToday: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm">Available Today</span>
              </label>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map(doctor => (
              <Card key={doctor.id} className={cn(cardVariants({ variant: 'elevated', hover: 'lift' }))}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={doctor.profileImage} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{doctor.name}</h3>
                          <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                        </div>
                        {doctor.availableToday && (
                          <Badge variant="success" className="text-xs">Available Today</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{doctor.rating}</span>
                          <span>({doctor.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{doctor.experience} years exp</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{doctor.location}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-semibold text-green-600">
                            {numberUtils.formatCurrency(doctor.consultationFee)}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">consultation</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/doctors/${doctor.id}`}>
                              View Profile
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/appointments/book?doctorId=${doctor.id}`}>
                              <Calendar className="h-4 w-4 mr-1" />
                              Book
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No doctors found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}