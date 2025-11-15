'use client';

import Link from 'next/link';
import { Stethoscope, ChevronDown, LogIn, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { NAVIGATION_ITEMS, CONTACT_INFO, ROUTES } from '@/constants';
import { layoutClasses, responsiveClasses } from '@/styles';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => (
  <Link 
    href={href} 
    className={cn(
      "text-foreground/80 transition-colors hover:text-foreground font-medium",
      className
    )}
  >
    {children}
  </Link>
);

interface DropdownNavLinkProps {
  label: string;
  children: React.ReactNode;
}

const DropdownNavLink = ({ label, children }: DropdownNavLinkProps) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild>
      <Button 
        variant="ghost" 
        className="h-auto p-0 text-foreground/80 transition-colors hover:bg-transparent hover:text-foreground font-medium"
      >
        {label}
        <ChevronDown className="ml-1 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-56 z-50" sideOffset={5}>
      {children}
    </DropdownMenuContent>
  </DropdownMenu>
);

const MobileMenu = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-80 p-0">
      <div className="flex h-full flex-col">
        <SheetHeader className="border-b p-6">
          <SheetTitle className={cn(layoutClasses.flex.center, "space-x-2")}>
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-blue-600">Apex Hospital</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Emergency Contact */}
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">Emergency</h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${CONTACT_INFO.EMERGENCY.AMBULANCE}`} className="text-red-700 font-medium">
                  {CONTACT_INFO.EMERGENCY.AMBULANCE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>🏥</span>
                <a href={`tel:${CONTACT_INFO.EMERGENCY.HOSPITAL}`} className="text-red-700 font-medium">
                  {CONTACT_INFO.EMERGENCY.HOSPITAL}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.label}>
                <h3 className="font-semibold text-gray-900 mb-2">{item.label}</h3>
                <div className="space-y-2 ml-4">
                  {item.items?.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href || '#'}
                      className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
        
        {/* Mobile Auth Section */}
        <div className="border-t p-6">
          <div className="space-y-3">
            <Button asChild className="w-full" variant="outline">
              <Link href="/login/patient">
                Login
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/login/patient">
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href={ROUTES.HOME} className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-blue-600 whitespace-nowrap">Apex Hospital</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={cn(responsiveClasses.hide.tablet, layoutClasses.flex.center, "space-x-6")}>
          {NAVIGATION_ITEMS.slice(0, 6).map((item) => (
            <DropdownNavLink key={item.label} label={item.label}>
              {item.items?.map((subItem) => (
                <DropdownMenuItem key={subItem.label} asChild>
                  <Link href={subItem.href || '#'}>{subItem.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownNavLink>
          ))}
          <NavLink href={ROUTES.CONTACT}>Contact</NavLink>
        </nav>

        {/* Desktop Actions */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Book Appointment Button */}
          <div className={cn(responsiveClasses.hide.tablet, layoutClasses.flex.center, "space-x-2")}>
            <Button 
              asChild
              variant="outline" 
              size="sm" 
              className="text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors text-xs"
            >
              <Link href="/appointments/book">
                Book Appointment
              </Link>
            </Button>
            
            {/* Helpline */}
            <div className="flex flex-col items-end px-2 py-1 rounded-md bg-blue-50">
              <div className="text-xs font-semibold text-blue-600 whitespace-nowrap">24/7 HELPLINE</div>
              <a 
                href={`tel:${CONTACT_INFO.GENERAL.PHONE}`} 
                className="text-xs font-bold text-gray-900 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {CONTACT_INFO.GENERAL.PHONE}
              </a>
            </div>
          </div>

          {/* Authentication Section */}
          <div className="hidden xl:flex items-center space-x-1">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 transition-colors">
                  <LogIn className="h-4 w-4 xl:mr-2" />
                  <span className="hidden xl:inline">Login</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50" sideOffset={5}>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/login/patient" className="cursor-pointer">
                      Patient Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login/doctor" className="cursor-pointer">
                      Doctor Login
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 transition-colors text-xs px-2 xl:px-4">
                  <span className="hidden xl:inline">Sign Up</span>
                  <span className="xl:hidden">+</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50" sideOffset={5}>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/login/patient" className="cursor-pointer">
                      Patient Sign Up
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login/doctor" className="cursor-pointer">
                      Doctor Sign Up
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className={responsiveClasses.show.tablet}>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}