import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <h4 className="mb-4 font-semibold">About Apex</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Overview</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Achievements</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Awards</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">News</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Our Doctors</h4>
            <ul className="space-y-2">
              <li><Link href="/doctors" className="text-sm text-muted-foreground hover:text-primary">Find a Doctor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Health Checkup</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Packages</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Patient Info</h4>
            <ul className="space-y-2">
              <li><Link href="/symptom-checker" className="text-sm text-muted-foreground hover:text-primary">Symptom Checker</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">International Care</h4>
            <ul className="space-y-2">
               <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
            </ul>
          </div>
          <div className="col-span-2 mt-8 md:col-span-6 lg:col-span-2 lg:mt-0">
             <h4 className="mb-4 font-semibold">Get a Call Back</h4>
             <form className="space-y-3">
                <Input placeholder="Full Name" />
                <Input type="tel" placeholder="Phone Number" />
                <Button className="w-full">Send OTP</Button>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Medical Opinion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opinion">Medical Opinion</SelectItem>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="careers">Careers</SelectItem>
                    <SelectItem value="other">Others</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full" type="submit">Submit</Button>
             </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="font-bold">Apex Hospital</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">&copy; {new Date().getFullYear()} Apex Hospital. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms & Conditions</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
