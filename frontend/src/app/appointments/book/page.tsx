'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock, User, CreditCard, MapPin, Video, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useAuth } from '@/hooks/useAuth'; // Temporarily disabled
import { useApiMutation } from '@/hooks/useApi';
import { appointmentsApi } from '@/lib/api';
import { layoutClasses } from '@/styles';
import { cn, numberUtils } from '@/lib/utils';
import { TIME_SLOTS } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const mockDoctor = {
  id: '1',
  name: 'Dr. Rajesh Kumar',
  specialty: 'Cardiology',
  consultationFee: 800,
  location: 'Apex Hospital, Chennai Central'
};

export default function BookAppointmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId');
  const isAuthenticated = false; // Temporary
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    doctorId: doctorId || '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'offline',
    reason: '',
    patientNotes: '',
    patientName: '',
    patientPhone: '',
    patientEmail: ''
  });

  const { mutate: bookAppointment, loading } = useApiMutation(appointmentsApi.create);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login/patient?redirect=/appointments/book');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await bookAppointment(formData);
      router.push('/appointments?success=true');
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  const getAvailableSlots = () => {
    // Mock available slots - in real app, fetch from API
    return TIME_SLOTS.MORNING.concat(TIME_SLOTS.AFTERNOON);
  };

  const getTotalFee = () => {
    const baseFee = mockDoctor.consultationFee;
    const onlineFee = formData.appointmentType === 'online' ? 0 : 0; // No extra charge for online
    return baseFee + onlineFee;
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={layoutClasses.container}>
        <div className="py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/doctors">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
              <p className="text-gray-600">Schedule your consultation</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    step >= stepNum ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  )}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={cn(
                      "w-16 h-1 mx-2",
                      step > stepNum ? "bg-blue-600" : "bg-gray-200"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Select Date & Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="date">Appointment Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.appointmentDate}
                        onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Appointment Type</Label>
                      <RadioGroup
                        value={formData.appointmentType}
                        onValueChange={(value) => handleInputChange('appointmentType', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="offline" id="offline" />
                          <Label htmlFor="offline" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            In-Person Consultation
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online" className="flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            Video Consultation
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.appointmentDate && (
                      <div>
                        <Label>Available Time Slots</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {getAvailableSlots().map((slot) => (
                            <Button
                              key={slot}
                              variant={formData.appointmentTime === slot ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleInputChange('appointmentTime', slot)}
                              className="text-xs"
                            >
                              {slot}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={() => setStep(2)}
                      disabled={!formData.appointmentDate || !formData.appointmentTime}
                      className="w-full"
                    >
                      Continue
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Patient Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.patientName}
                          onChange={(e) => handleInputChange('patientName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.patientPhone}
                          onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.patientEmail}
                        onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Select value={formData.reason} onValueChange={(value) => handleInputChange('reason', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="routine-checkup">Routine Checkup</SelectItem>
                          <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                          <SelectItem value="new-symptoms">New Symptoms</SelectItem>
                          <SelectItem value="second-opinion">Second Opinion</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any specific concerns or symptoms..."
                        value={formData.patientNotes}
                        onChange={(e) => handleInputChange('patientNotes', e.target.value)}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button 
                        onClick={() => setStep(3)}
                        disabled={!formData.patientName || !formData.patientPhone || !formData.reason}
                        className="flex-1"
                      >
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Confirm & Pay
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Appointment Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Doctor:</span>
                          <span>{mockDoctor.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date & Time:</span>
                          <span>{formData.appointmentDate} at {formData.appointmentTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span>{formData.appointmentType === 'online' ? 'Video Consultation' : 'In-Person'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reason:</span>
                          <span>{formData.reason.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total Amount:</span>
                        <span className="text-green-600">{numberUtils.formatCurrency(getTotalFee())}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1"
                      >
                        {loading ? 'Booking...' : 'Confirm & Pay'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Doctor Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{mockDoctor.name}</h4>
                      <p className="text-blue-600">{mockDoctor.specialty}</p>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{mockDoctor.location}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Consultation Fee:</span>
                        <span className="font-semibold text-green-600">
                          {numberUtils.formatCurrency(mockDoctor.consultationFee)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}