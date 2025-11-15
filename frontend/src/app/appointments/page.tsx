'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Video, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useAuth } from '@/hooks/useAuth'; // Temporarily disabled
import { layoutClasses, cardVariants } from '@/styles';
import { cn, dateUtils, numberUtils } from '@/lib/utils';
import { APPOINTMENT_STATUS_COLORS } from '@/constants';
import Link from 'next/link';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  type: 'online' | 'offline';
  location?: string;
  fee: number;
  reason: string;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Rajesh Kumar',
    specialty: 'Cardiology',
    date: '2024-01-20',
    time: '10:00 AM',
    status: 'confirmed',
    type: 'offline',
    location: 'Apex Hospital, Chennai Central',
    fee: 800,
    reason: 'Regular checkup'
  },
  {
    id: '2',
    doctorName: 'Dr. Priya Sharma',
    specialty: 'Neurology',
    date: '2024-01-18',
    time: '2:30 PM',
    status: 'completed',
    type: 'online',
    fee: 900,
    reason: 'Follow-up consultation'
  }
];

export default function AppointmentsPage() {
  const [filter, setFilter] = useState('all');
  const [appointments] = useState(mockAppointments);
  const isAuthenticated = false; // Temporary - will be replaced with real auth

  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' || apt.status === filter
  );

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={layoutClasses.container}>
        <div className="py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
              <p className="text-gray-600">Manage your healthcare appointments</p>
            </div>
            <Button asChild>
              <Link href="/appointments/book">
                <Calendar className="h-4 w-4 mr-2" />
                Book New Appointment
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Appointments</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Appointments List */}
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="space-y-4">
                {filteredAppointments
                  .filter(apt => new Date(apt.date) >= new Date())
                  .map(appointment => (
                    <Card key={appointment.id} className={cardVariants({ variant: 'elevated', hover: 'lift' })}>
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {appointment.doctorName}
                                </h3>
                                <p className="text-blue-600 font-medium mb-2">{appointment.specialty}</p>
                                <p className="text-gray-600 text-sm">{appointment.reason}</p>
                              </div>
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>{dateUtils.format(appointment.date, 'PPP')}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                {appointment.type === 'online' ? (
                                  <Video className="h-4 w-4" />
                                ) : (
                                  <MapPin className="h-4 w-4" />
                                )}
                                <span>
                                  {appointment.type === 'online' ? 'Video Consultation' : appointment.location}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div className="text-right">
                              <div className="text-lg font-semibold text-green-600">
                                {numberUtils.formatCurrency(appointment.fee)}
                              </div>
                              <p className="text-xs text-gray-500">Consultation Fee</p>
                            </div>
                            
                            <div className="flex gap-2">
                              {appointment.status === 'confirmed' && (
                                <>
                                  {appointment.type === 'online' && (
                                    <Button size="sm">
                                      <Video className="h-4 w-4 mr-1" />
                                      Join Call
                                    </Button>
                                  )}
                                  <Button variant="outline" size="sm">
                                    Reschedule
                                  </Button>
                                </>
                              )}
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-4">
                {filteredAppointments
                  .filter(apt => new Date(apt.date) < new Date())
                  .map(appointment => (
                    <Card key={appointment.id} className="opacity-75">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{appointment.doctorName}</h3>
                            <p className="text-blue-600">{appointment.specialty}</p>
                            <p className="text-sm text-gray-600">
                              {dateUtils.format(appointment.date, 'PPP')} at {appointment.time}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <div className="mt-2">
                              <Button variant="outline" size="sm">
                                View Report
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredAppointments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-600 mb-6">You don't have any appointments matching the selected filter.</p>
                <Button asChild>
                  <Link href="/appointments/book">Book Your First Appointment</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}