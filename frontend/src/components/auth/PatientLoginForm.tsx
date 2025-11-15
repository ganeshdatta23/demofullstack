'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { flex, container } from '@/styles/utils';
import { cn } from '@/lib/utils';

export function PatientLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Patient login:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={flex.center("min-h-[calc(100vh-12rem)] px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-green-50")}>
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className={flex.center("mx-auto w-12 h-12 bg-blue-100 rounded-full mb-2")}>
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Patient Login</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your credentials to access your patient portal
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 px-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className={flex.between()}>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Link href="#" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-colors">
                Sign In to Patient Portal
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className={cn(flex.column(), "items-center space-y-4 px-6 pb-6")}>
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="#" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                Create Patient Account
              </Link>
            </div>
            
            <div className="text-center">
              <Link href="/login/doctor" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Are you a doctor? Login here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}