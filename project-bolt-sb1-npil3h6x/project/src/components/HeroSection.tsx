import React from "react"; // Ensure React is imported if using JSX

export default function HeroSection() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-blue-600">Professional</span>
                <span className="block text-blue-600">Facility Management</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Your trusted partner in comprehensive facility management solutions. We provide professional manpower, security, and maintenance services.
              </p>

              {/* Apply Now and View Jobs Buttons */}
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#apply"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Apply Now
                  </a>
                </div>
                <div className="ml-4 rounded-md shadow">
                  <a
                    href="#jobs"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10"
                  >
                    View Jobs
                  </a>
                </div>
              </div>

              {/* Job Notification Section */}
              <div className="mt-8 sm:mt-12">
                <p className="text-lg text-gray-600 sm:text-xl">
                  Stay updated with the latest job opportunities! Click the button to explore available positions.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex justify-end items-center">
      <img
  className="h-[400px] w-[500px] object-contain border-4 border-orange-500"
  src="/img1.png"  // Correct path to image in the public folder
  alt="Professional facility management"
/>
      </div>
    </div>
  );
}
