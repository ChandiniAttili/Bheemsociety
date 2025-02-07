import React from 'react';
import { Building2, Award, Users, Clock } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Company Overview */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="md:w-full">
            <h2 className="text-3xl font-bold mb-6">About Bheem Society</h2>
            <p className="text-lg text-gray-600 mb-6">
              Established in 2018, Bheem Society has been a leading provider of outsourcing jobs in the Government of Telangana. We take pride in addressing unemployment by creating meaningful job opportunities and empowering individuals within our community. Through our professional services, we strive to reduce unemployment and contribute to the region's economic growth while fostering skill development and career advancement.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our commitment to excellence and customer satisfaction has established us as a trusted name in the facility management industry. We offer a diverse range of services, including{' '}
              <span className="text-marron font-bold">
  Staff Nurses, Lab Technician, Lab Assistants, EX-Ray Technician, Dark Room Technician, Senior Assistant, Senior Steno, Senior Accountant, Translator, Computer Operator/DPO, Driver, Junior Assistant, Junior Steno, Typist, Telephone Operator, Store Keeper, Photographer, Electrician, Mechanic Entry Operator, Supervisor, Librarian, Manager, Office Subordinate, Watchman, Mali, Kamati, Cook, Cycle Orderly, Chowkidar, Lab Attender, Dafedar, Jamedar, Roneo/Xerox Operator, Record Assistant, Shariff/Cashier
</span>, along with housekeeping, security guard services, cashier and sales personnel support, and government-attached projects.
            </p>
            <p className="text-lg text-gray-600">
              Combining expertise with innovation, we ensure top-quality service tailored to meet our clients' unique needs. Our highly trained professionals bring reliability and efficiency to every task, whether it's maintaining a clean and organized environment, ensuring safety and security, or providing skilled manpower for business operations. Partner with us to experience unmatched service quality that drives success and exceeds expectations.
            </p>
          </div>
        </div>

        {/* Features Grid */}
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

