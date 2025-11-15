'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    specialty: '',
    date: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle appointment booking logic here
    console.log('Booking appointment:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl max-w-full">
      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">Quick Appointment</h3>
      <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input 
            name="fullName"
            placeholder="Full Name" 
            className="border-gray-200 text-sm"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <Input 
            name="phone"
            placeholder="Phone Number" 
            className="border-gray-200 text-sm"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <Input 
          name="email"
          type="email"
          placeholder="Email Address" 
          className="border-gray-200 text-sm"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <select 
          name="specialty"
          className="w-full p-2 sm:p-3 border border-gray-200 rounded-md text-sm"
          value={formData.specialty}
          onChange={handleChange}
          required
        >
          <option value="">Select Specialty</option>
          <option value="cardiology">Cardiology</option>
          <option value="neurology">Neurology</option>
          <option value="orthopedics">Orthopedics</option>
          <option value="pediatrics">Pediatrics</option>
        </select>
        <Input 
          name="date"
          type="date" 
          className="border-gray-200 text-sm"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <Button type="submit" size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
          Book Appointment
        </Button>
      </form>
    </div>
  );
}