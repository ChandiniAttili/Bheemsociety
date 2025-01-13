import React from 'react';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import JobNotifications from './components/JobNotifications';
import ApplicationForm from './components/BookingForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <h1 className="sr-only">Bheem Society - Leading Security Services & Facility Management in Hyderabad</h1>
        <HeroSection />
        <AboutSection />
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
                  <strong>Phone:</strong> <a href="tel:+919441666624" className="text-blue-600 hover:underline">+91 94416 66624</a>
                </p>
                <p className="mb-4">
                  <strong>Email:</strong> <a href="mailto:bheemsociety1@gmail.com" className="text-blue-600 hover:underline">bheemsociety1@gmail.com</a>
                </p>
              </address>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <nav aria-label="Footer Navigation">
            <ul className="flex justify-center space-x-6 mb-4">
              <li><a href="#about" className="hover:text-blue-300">About</a></li>
              <li><a href="#services" className="hover:text-blue-300">Services</a></li>
              <li><a href="#jobs" className="hover:text-blue-300">Jobs</a></li>
              <li><a href="#contact" className="hover:text-blue-300">Contact</a></li>
            </ul>
          </nav>
          <p>&copy; {new Date().getFullYear()} Bheem Society. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;