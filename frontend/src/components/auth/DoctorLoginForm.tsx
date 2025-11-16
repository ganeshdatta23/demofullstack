'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { flex } from '@/styles/utils';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import type { LoginFormData } from '@/types';

export function DoctorLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, error, clearError } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      await login(formData);
      router.push('/'); // Redirect to dashboard after successful login
    } catch (error) {
      // Error is handled by the auth context
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) clearError();
  };

  return (
    <div className={flex.center("min-h-[calc(100vh-12rem)] px-4 py-8 bg-gradient-to-br from-green-50 via-white to-blue-50")}>
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className={flex.center("mx-auto w-12 h-12 bg-green-100 rounded-full mb-2")}>
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Doctor Login</CardTitle>
            <CardDescription className="text-gray-600">
              Access your doctor dashboard and manage patient appointments
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 px-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Medical License Email
                </Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your registered email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  disabled={isLoading}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className={flex.between()}>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Link href="#" className="text-sm text-green-600 hover:text-green-500 transition-colors">
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
                  className="h-11 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  disabled={isLoading}
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-11 bg-green-600 hover:bg-green-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Access Doctor Dashboard'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className={cn(flex.column(), "items-center space-y-4 px-6 pb-6")}>
            <div className="text-center text-sm text-gray-600">
              Not registered with Apex Hospital?{" "}
              <Link href="#" className="text-green-600 hover:text-green-500 font-medium transition-colors">
                Join Our Medical Team
              </Link>
            </div>
            
            <div className="text-center">
              <Link href="/login/patient" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Are you a patient? Login here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}