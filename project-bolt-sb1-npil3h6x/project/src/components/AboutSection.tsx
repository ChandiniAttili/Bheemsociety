import React from 'react';
import { Building2, Award, Users, Clock } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Company Overview */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">About Bheem Society</h2>
            <p className="text-lg text-gray-600 mb-6">
              Established in 2018, Bheem Society has been a leading provider of outsourcing jobs under the government of Telangana. We take pride in addressing unemployment by creating meaningful job opportunities and empowering individuals within our community. Through our professional services, we strive to reduce unemployment and contribute to the region's economic growth while fostering skill development and career advancement.
            </p>
            <p className="text-lg text-gray-600">
              Our commitment to excellence and customer satisfaction has established us as a trusted name in the facility management industry. We offer a diverse range of services, including{' '}
              <strong>Senior Assistant</strong>, <strong>Senior Steno</strong>, <strong>Senior Accountant</strong>, <strong>Translator</strong>, <strong>Computer Operator/DPO</strong>, <strong>Driver</strong>, <strong>Junior Assistant</strong>, <strong>Junior Steno</strong>, <strong>Typist</strong>, <strong>Telephone Operator</strong>, <strong>Store Keeper</strong>, <strong>Photographer</strong>, <strong>Electrician</strong>, <strong>Mechanic Entry Operator</strong>, <strong>Supervisor</strong>, <strong>Librarian</strong>, <strong>Manager</strong>, <strong>Office Subordinate</strong>, <strong>Watchman</strong>, <strong>Mali</strong>, <strong>Kamati</strong>, <strong>Cook</strong>, <strong>Cycle Orderly</strong>, <strong>Chowkidar</strong>, <strong>Lab Attender</strong>, <strong>Dafedar</strong>, <strong>Jamedar</strong>, <strong>Roneo/Xerox Operator</strong>, <strong>Record Assistant</strong>, <strong>Shariff/Cashier</strong>, and <strong>Lift Operator</strong>, along with housekeeping, security guard services, cashier and sales personnel support, and government-attached projects.
            </p>
            <p className="text-lg text-gray-600">
              Combining expertise with innovation, we ensure top-quality service tailored to meet our clients' unique needs. Our highly trained professionals bring reliability and efficiency to every task, whether it's maintaining a clean and organized environment, ensuring safety and security, or providing skilled manpower for business operations. Partner with us to experience unmatched service quality that drives success and exceeds expectations.
            </p>
          </div>
          <div className="md:w-1/2">
            {/* Chairman Profile */}
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="/img3.jpeg"
                  alt="Srikanth Rathnam"
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-blue-600">Srikanth Rathnam, B.Sc</h3>
              <p className="text-xl font-bold text-green-600 mb-4">Chairman</p>
              <p className="text-gray-600">Bheem Society Pvt.Ltd</p>
            </div>
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
