'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { layoutClasses, cardVariants, typographyClasses } from '@/styles';
import { CONTACT_INFO } from '@/constants';
import { cn } from '@/lib/utils';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    description: 'Call us for immediate assistance',
    value: CONTACT_INFO.GENERAL.PHONE,
    action: `tel:${CONTACT_INFO.GENERAL.PHONE}`,
    color: 'blue'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Send us your queries',
    value: CONTACT_INFO.GENERAL.EMAIL,
    action: `mailto:${CONTACT_INFO.GENERAL.EMAIL}`,
    color: 'green'
  },
  {
    icon: MapPin,
    title: 'Location',
    description: 'Visit our main hospital',
    value: 'Chennai Central, Tamil Nadu',
    action: '#',
    color: 'purple'
  },
  {
    icon: Clock,
    title: 'Emergency',
    description: '24/7 Emergency Services',
    value: CONTACT_INFO.EMERGENCY.AMBULANCE,
    action: `tel:${CONTACT_INFO.EMERGENCY.AMBULANCE}`,
    color: 'red'
  }
];

const departments = [
  'General Inquiry',
  'Appointment Booking',
  'Emergency Services',
  'Patient Records',
  'Insurance Claims',
  'Billing Department',
  'Feedback & Complaints'
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className={layoutClasses.container}>
          <div className="max-w-3xl">
            <h1 className={cn(typographyClasses.heading.h1, "text-white mb-6")}>
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We're here to help you with all your healthcare needs. 
              Reach out to us anytime for assistance, appointments, or emergency care.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className={layoutClasses.section}>
        <div className={layoutClasses.container}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className={cardVariants({ variant: 'elevated', hover: 'lift' })}>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 bg-${method.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className={`h-6 w-6 text-${method.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                  <a 
                    href={method.action}
                    className={`text-${method.color}-600 font-medium hover:underline`}
                  >
                    {method.value}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-gray-50 py-16">
        <div className={layoutClasses.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className={cardVariants({ variant: 'elevated' })}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please describe your inquiry..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Hospital Information */}
            <div className="space-y-6">
              <Card className={cardVariants({ variant: 'elevated' })}>
                <CardHeader>
                  <CardTitle>Hospital Locations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Main Hospital - Chennai Central</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      123 Medical Center Drive<br />
                      Chennai Central, Tamil Nadu 600001
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span> {CONTACT_INFO.GENERAL.PHONE}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Branch Hospital - Chennai South</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      456 Healthcare Avenue<br />
                      Chennai South, Tamil Nadu 600041
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span> +91-44-4554-4456
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={cardVariants({ variant: 'elevated' })}>
                <CardHeader>
                  <CardTitle>Operating Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Emergency Services</span>
                      <span className="font-medium text-red-600">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>OPD Services</span>
                      <span className="font-medium">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pharmacy</span>
                      <span className="font-medium">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Laboratory</span>
                      <span className="font-medium">6:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Radiology</span>
                      <span className="font-medium">24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={cardVariants({ variant: 'elevated' })}>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    Book Appointment Online
                  </Button>
                  <Button className="w-full" variant="outline">
                    View Test Reports
                  </Button>
                  <Button className="w-full" variant="outline">
                    Find a Doctor
                  </Button>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Emergency Services
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={layoutClasses.section}>
        <div className={layoutClasses.container}>
          <div className="text-center mb-8">
            <h2 className={cn(typographyClasses.heading.h2, "mb-4")}>Find Us</h2>
            <p className={typographyClasses.body.large}>Located in the heart of Chennai for easy accessibility</p>
          </div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500">Interactive Map Coming Soon</p>
          </div>
        </div>
      </section>
    </div>
  );
}