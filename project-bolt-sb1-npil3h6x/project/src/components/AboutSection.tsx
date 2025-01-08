import React from 'react';
import { Building2, Award, Users, Clock } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">About Bheem Society</h2>
          <p className="text-lg text-gray-600 mb-8">
            Established in 2024, Bheem Society has been a leading provider of facility management and security services in Hyderabad. We take pride in delivering professional services while creating employment opportunities for our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Professional Services</h3>
            <p className="text-gray-600">Comprehensive facility management solutions for businesses</p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Licensed & Certified</h3>
            <p className="text-gray-600">Fully compliant with industry standards and regulations</p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
            <p className="text-gray-600">Trained and experienced professionals at your service</p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock service and assistance</p>
          </div>
        </div>
      </div>
    </section>
  );
}