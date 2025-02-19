import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import BookingForm from "./components/BookingForm";
import JobNotifications from "./components/JobNotifications";
import ApplicationForm from "./components/Booking";

export default function App() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Handle the Apply button click to show the application form
  const onApplyClick = () => {
    setShowApplicationForm(true); // Show the application form when Apply is clicked
  };

  // Image array
  const images = [
    "/b1.jpeg",
    "/b3.jpeg",
    "/b4.jpeg",
    "/c1.jpg",
    "/t9.jpeg",
    "/c3.jpg",
    "/c4.jpg",
    "/c5.jpg",
    "/c6.jpg",
    "/c8.jpg",
    "/c9.jpg",
  ];

  // To manage the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // UseEffect hook for automatic image change every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Flex Container for Text */}
      <div className="text-center pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-black text-blue-600 mb-4">
          Bheem Society
        </h1>
        <h4 className="text-3xl md:text-4xl font-black text-green-600 mb-2">
          Registered Government of Telangana
        </h4>
        <h6 className="text-2xl md:text-2xl font-black text-red-400 mb-4">
          Govt. Outsourcing Jobs
        </h6>

        <div className="absolute animate-scroll mb-8">
          <p className="text-lg font-semibold text-orange-900">
            <span className="text-blue-500 font-bold animate-pulse">[new]</span>
            ***1878 outsourcing jobs available in the Irrigation & CAD Department administrative
            control of Engineer in Chief (Admn)***
          </p>
        </div>
      </div>

      {/* Profile Section with Images */}
      <div className="relative pt-12 pb-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Left Image */}
          <div className="flex flex-col items-center text-center md:w-1/4">
            <img
              src="/img3.jpeg"
              alt="Srikanth Rathnam"
              className="w-40 h-40 object-cover rounded-full shadow-lg mb-2"
            />
            <h3 className="text-lg font-bold text-blue-600">
              Srikanth Rathnam, B.Sc
            </h3>
            <p className="text-sm font-bold text-green-600">Chairman</p>
            <p className="text-xs text-gray-600">Bheem Society Pvt. Ltd</p>
          </div>

          {/* Centered Text */}
          <div className="text-center md:w-2/4 px-4">
            <h1 className="text-3xl md:text-4xl font-black text-blue-600 mb-2">
              Welcome to Bheem Society
            </h1>
            <p className="text-sm md:text-base text-gray-700 max-w-xl mx-auto">
            Bheem Society has been a leading provider of outsourcing jobs in the government of Telangana. 
            </p>
          </div>

          {/* Right Image */}
          <div className="flex flex-col items-center text-center md:w-1/4">
            <img
              src="/b2.jpeg"
              alt="P. Dharmendra"
              className="w-40 h-40 object-cover rounded-full shadow-lg mb-2"
            />
            <h3 className="text-lg font-bold text-blue-600">P. Dharmendra</h3>
            <p className="text-sm font-bold text-green-600">CEO</p>
            <p className="text-xs text-gray-600">Bheem Society Pvt. Ltd</p>
          </div>
        </div>
      </div>

      {/* About Section with images carousel */}
      <section id="about" className="py-16 scroll-mb-4">
        <div className="container mx-auto px-4">
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt={`About Image ${currentImageIndex + 1}`}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              style={{ width: "1600px", height: "500px" }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      <main className="pt-16">
        {/* Hero Section */}
        <section id="home">
          <HeroSection onApplyClick={onApplyClick} />
        </section>

        {/* Conditionally Render Application Form */}
        {showApplicationForm ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 text-center">
              <div
                className="fixed inset-0"
                onClick={() => setShowApplicationForm(false)}
              ></div>
              <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg relative z-50">
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">&times;</span>
                </button>
                <ApplicationForm
                  onSubmitSuccess={() => setShowApplicationForm(false)}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Regular Sections to display when form is hidden */}
            <ServicesSection />
            <JobNotifications />
            <BookingForm />

          </>
        )}

        {/* Contact Section */}
        <section id="contact" className="py-20 scroll-mb-4">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
            <div className="max-w-2xl mx-auto text-center">
              <address className="not-italic">
                <p className="mb-4">
                  <strong>Address:</strong> Plot No:204, 3rd floor, City Home
                  Apartment, Himayatnagar Hyderabadh Telangana-500029
                </p>
                <p className="mb-4">
                  <strong>Land Line:</strong>{" "}
                  <a
                    href="tel:04045214064"
                    className="text-blue-600 hover:underline"
                  >
                    040 4521 4064
                  </a>
                </p>
                <p className="mb-4">
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+9193924 62636"
                    className="text-blue-600 hover:underline"
                  >
                    +91 93924 62636
                  </a>
                </p>
                <p className="mb-4">
                  <strong>Alternative Phone:</strong>{" "}
                  <a
                    href="tel:+919848000561"
                    className="text-blue-600 hover:underline"
                  >
                    +91 98480 00561
                  </a>
                </p>
                <p className="mb-4">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:bhemsociety@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    bhemsociety@gmail.com
                  </a>
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
              <li>
                <a
                  href="#about"
                  className="hover:text-blue-300 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-blue-300 transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="#jobs"
                  className="hover:text-blue-300 transition-colors"
                >
                  Career Opportunities
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-300 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="tel:+919441666624"
                  className="hover:text-blue-300 transition-colors"
                >
                  Call Now: +91 9392462636
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-center">
            <p className="mb-2">
              &copy; {new Date().getFullYear()} Bheem Society. All rights
              reserved.
            </p>
            <p className="text-sm text-gray-400">
              Professional Security Services & Facility Management in Hyderabad
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}