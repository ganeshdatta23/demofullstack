import { Heart, Brain, Bone, Baby, Eye, Stethoscope, Activity, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const services = [
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Comprehensive heart care with advanced cardiac procedures',
    features: ['Cardiac Surgery', 'Angioplasty', 'Pacemaker Implantation', 'Heart Transplant'],
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Brain,
    title: 'Neurology',
    description: 'Expert neurological care for brain and nervous system disorders',
    features: ['Brain Surgery', 'Stroke Treatment', 'Epilepsy Care', 'Neurocritical Care'],
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Bone,
    title: 'Orthopedics',
    description: 'Advanced bone and joint treatments with minimally invasive techniques',
    features: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Trauma Care'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Baby,
    title: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents',
    features: ['NICU', 'Pediatric Surgery', 'Child Development', 'Vaccination'],
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Eye,
    title: 'Ophthalmology',
    description: 'Complete eye care with state-of-the-art vision correction',
    features: ['Cataract Surgery', 'LASIK', 'Retinal Surgery', 'Glaucoma Treatment'],
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Stethoscope,
    title: 'Internal Medicine',
    description: 'Comprehensive adult healthcare and chronic disease management',
    features: ['Diabetes Care', 'Hypertension', 'Preventive Care', 'Health Screening'],
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
];

const emergencyServices = [
  {
    icon: Activity,
    title: '24/7 Emergency Care',
    description: 'Round-the-clock emergency medical services with trauma center',
  },
  {
    icon: Shield,
    title: 'Critical Care',
    description: 'Advanced ICU facilities with specialized critical care teams',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-teal-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Comprehensive Medical Services
            </h1>
            <p className="text-xl md:text-2xl text-green-100">
              Advanced healthcare solutions across 25+ medical specialties with world-class facilities
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-red-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Services</h2>
            <p className="text-lg text-gray-600">Available 24/7 for your urgent medical needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {emergencyServices.map((service, index) => (
              <Card key={index} className="border-red-200 bg-white shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Button className="bg-red-600 hover:bg-red-700">
                    Emergency: 108
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Specialties */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Medical Specialties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert care across multiple specialties with advanced technology and experienced medical professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardHeader className={`${service.bgColor} pb-6`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white ${service.color} mb-4`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900">Key Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/doctors">Find Doctors</Link>
                    </Button>
                    <Button className="flex-1">
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Facilities */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Medical Facilities
            </h2>
            <p className="text-xl text-gray-600">
              State-of-the-art infrastructure and cutting-edge medical technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              'Robotic Surgery',
              'Advanced Imaging',
              'Hybrid OR',
              'Telemedicine',
              'Digital Health Records',
              'AI Diagnostics',
              'Precision Medicine',
              'Minimally Invasive Procedures'
            ].map((facility, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-gray-900">{facility}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need Medical Assistance?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our medical experts are here to help you with personalized care and treatment plans
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/doctors">Book Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Emergency: 108
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}