'use client';

import Link from 'next/link';
import { Stethoscope, LogIn, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-foreground/80 transition-colors hover:text-foreground">
    {children}
  </Link>
);

const DropdownNavLink = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-auto p-0 text-foreground/80 transition-colors hover:bg-transparent hover:text-foreground">
        {label}
        <ChevronDown className="ml-1 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">{children}</DropdownMenuContent>
  </DropdownMenu>
);

const menuItems = [
  {
    label: 'About',
    items: [
      { label: 'Overview', href: '#' },
      { label: 'Awards & Recognition', href: '#' },
      { label: 'Achievements', href: '#' },
      { label: 'Apex Foundation', href: '#' },
    ],
  },
  {
    label: 'News',
    items: [
      { label: 'News & Updates', href: '#' },
      { label: 'Events', href: '#' },
      { label: 'Medical Updates', href: '#' },
      { label: 'PR Coverage', href: '#' },
    ],
  },
  {
    label: 'Locations',
    items: [
      { label: 'Secunderabad', href: '#' },
      { label: 'Somajiguda', href: '#' },
      { label: 'Malakpet', href: '#' },
      { label: 'Hitec City', href: '#' },
    ],
  },
  {
    label: 'Specialities',
    items: [
      { label: 'Cardiology', href: '#' },
      { label: 'Neurology', href: '#' },
      { label: 'Oncology', href: '#' },
    ],
  },
  {
    label: 'International Patient',
    items: [
      { label: 'Services', href: '#' },
      { label: 'Visa Assistance', href: '#' },
      { label: 'Travel & Accommodation', href: '#' },
    ],
  },
  { label: 'Patient Info', items: [{ label: 'Testimonials', href: '#' }] },
  { label: 'Blog', items: [{ label: 'All Categories', href: '#' }] },
  { label: 'Careers', items: [{ label: 'Current Opportunities', href: '#' }] },
];

export function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 text-sm">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <span className="flex items-center gap-1">
                <span>📧</span>
                <span className="hidden sm:inline">info@apexhospital.com</span>
              </span>
              <span className="flex items-center gap-1">
                <span>🕒</span>
                <span>24/7 Emergency Services</span>
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <span className="flex items-center gap-1 font-medium">
                <span>📞</span>
                <span>Emergency: 108</span>
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span>🚑</span>
                <span className="hidden sm:inline">Ambulance: +91-44-4455-4455</span>
                <span className="sm:hidden">+91-44-4455-4455</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-6">
          <div className="mr-4 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80">
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-blue-600">Apex Hospital</span>
            </Link>
          <nav className="hidden items-center gap-6 text-sm lg:flex">
            {menuItems.map((item) => (
              <DropdownNavLink key={item.label} label={item.label}>
                {item.items.map((subItem) => (
                  <DropdownMenuItem key={subItem.label} asChild>
                    <Link href={subItem.href}>{subItem.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownNavLink>
            ))}
            <NavLink href="#">Contact Us</NavLink>
          </nav>
        </div>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors">
                Book Appointment
              </Button>
              <div className="flex flex-col items-end px-3 py-2 rounded-md bg-blue-50">
                <div className="text-xs font-semibold text-blue-600 whitespace-nowrap">24/7 HELPLINE</div>
                <a href="tel:+914445544455" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors whitespace-nowrap">
                  +91 44 4554 4455
                </a>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600 transition-colors">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/login/patient" className="cursor-pointer">Patient Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/login/doctor" className="cursor-pointer">Doctor Login</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                    Sign Up
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="#" className="cursor-pointer">Patient Sign Up</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#" className="cursor-pointer">Doctor Sign Up</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href="/" className="flex items-center space-x-2">
                        <Stethoscope className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg">Apex Hospital</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-6 py-6">
                    {menuItems.map((item) => (
                      <div key={item.label}>
                        <h4 className="font-semibold mb-3 text-gray-900">{item.label}</h4>
                        <div className="flex flex-col space-y-2 pl-4">
                          {item.items.map((subItem) => (
                            <NavLink key={subItem.label} href={subItem.href}>
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ))}
                    <NavLink href="#">Contact Us</NavLink>
                  </div>
                  <div className="border-t pt-6">
                    <div className="flex flex-col space-y-3">
                      <Button variant="outline" asChild className="justify-start">
                        <Link href="/login/patient">
                          <LogIn className="mr-2 h-4 w-4" />
                          Patient Login
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="justify-start">
                        <Link href="/login/doctor">
                          <LogIn className="mr-2 h-4 w-4" />
                          Doctor Login
                        </Link>
                      </Button>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="#">Sign Up</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
