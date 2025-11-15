'use client';

import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { layoutClasses, spacingClasses } from '@/styles';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className={cn(layoutClasses.container, spacingClasses.section)}>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <h4 className="mb-4 font-semibold text-foreground">About Apex</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Overview</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Achievements</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Awards</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">News</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-foreground">Our Doctors</h4>
            <ul className="space-y-2">
              <li><Link href="/doctors" className="text-sm text-muted-foreground hover:text-primary transition-colors">Find a Doctor</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Book Appointment</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Specialties</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-foreground">Services</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Health Packages</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Emergency Care</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Telemedicine</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold text-foreground">Patient Care</h4>
            <ul className="space-y-2">
              <li><Link href="/symptom-checker" className="text-sm text-muted-foreground hover:text-primary transition-colors">Symptom Checker</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Patient Portal</Link></li>
            </ul>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="mb-4 font-semibold text-foreground">Quick Contact</h4>
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); }}>
              <Input placeholder="Full Name" className="h-9" required />
              <Input type="tel" placeholder="Phone Number" className="h-9" required />
              <Select>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appointment">Book Appointment</SelectItem>
                  <SelectItem value="opinion">Medical Opinion</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="other">Other Inquiry</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full h-9" type="submit">Request Callback</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <div className={cn(layoutClasses.flex.between, "flex-col gap-4 md:flex-row")}>
            <div className={cn(layoutClasses.flex.center, "space-x-2")}>
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Apex Hospital</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} Apex Hospital. All rights reserved.
            </p>
            <div className={cn(layoutClasses.flex.wrap, "items-center gap-4")}>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
