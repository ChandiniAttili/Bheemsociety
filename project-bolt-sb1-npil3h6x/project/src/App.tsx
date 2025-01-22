import React from 'react';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import JobNotifications from './components/JobNotifications';
import ApplicationForm from './components/BookingForm';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
      <h1
  className="text-4xl md:text-5xl font-black text-blue-600 text-center pt-24 pb-0 mb-0"
>
  <center>Bheem Society</center>
</h1>
<h4
  className="text-3xl md:text-4xl font-black text-green-600 text-center pt-0 mt-0"
>
  <center>Registered Government of Telangana</center>
</h4>
<h6
  className="text-2xl md:text-2xl font-black text-red-400 text-center pt-0 mt-0"
>
  <center>Govt.Out Sourcing Jobs</center>
</h6>


        <AboutSection />
        <HeroSection />
        <ServicesSection />
        <JobNotifications />

        {/* Application Section */}
        <section id="apply" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Apply Now</h2>
            <ApplicationForm />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
            <div className="max-w-2xl mx-auto text-center">
              <address className="not-italic">
                <p className="mb-4">
                  <strong>Address:</strong> Plot No:204, 3rd floor, City Home Apartment, Himayatnagar-500029
                </p>
                <p className="mb-4">
                  <strong>Phone:</strong> <a href="tel:+9193924 62636" className="text-blue-600 hover:underline">+91 93924 62636</a>
                </p>
                <p className="mb-4">
                  <strong>Email:</strong> <a href="mailto:bhemsociety@gmail.com" className="text-blue-600 hover:underline">bhemsociety@gmail.com</a>
                </p>
              </address>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <nav aria-label="Footer Navigation" className="mb-8">
            <ul className="flex flex-wrap justify-center gap-6">
              <li><a href="#about" className="hover:text-blue-300 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-blue-300 transition-colors">Our Services</a></li>
              <li><a href="#jobs" className="hover:text-blue-300 transition-colors">Career Opportunities</a></li>
              <li><a href="#contact" className="hover:text-blue-300 transition-colors">Contact Us</a></li>
              <li><a href="tel:+919441666624" className="hover:text-blue-300 transition-colors">Call Now: +91 9392462636</a></li>
            </ul>
          </nav>
          <div className="text-center">
            <p className="mb-2">&copy; {new Date().getFullYear()} Bheem Society. All rights reserved.</p>
            <p className="text-sm text-gray-400">Professional Security Services & Facility Management in Hyderabad</p>
          </div>
        </div>
      </footer>
    </div>
  );
}