import React, { useState } from "react";
import { Users, Wrench, ChevronDown, ChevronUp } from "lucide-react";
import { IndianRupee } from "lucide-react";

interface JobsSectionProps {
  onApplyClick: () => void;
}

interface JobLocation {
  office: string;
  lascar: number;
  helper: number;
}

const jobLocations: JobLocation[] = [
  { office: "CE, Mulugu", lascar: 118, helper: 12 },
  { office: "CE, Warangal", lascar: 161, helper: 78 },
  { office: "CE, Suryapet", lascar: 308, helper: 3 },
  { office: "CE, Khammam", lascar: 176, helper: 49 },
  { office: "CE, Nalgonda", lascar: 279, helper: 66 },
  { office: "CE, Kamareddy", lascar: 34, helper: 1 },
  { office: "CE, Kothagudem", lascar: 115, helper: 0 },
  { office: "CE, Nizamabad", lascar: 9, helper: 3},
  { office: "CE, Adilabad", lascar: 83, helper: 3 },
  { office: "CE, Sangareddy", lascar: 16, helper: 4 },
  { office: "CE, Mahabubnagar", lascar: 79, helper:0 },
  { office: "CE, Nagarkurnool", lascar: 25, helper: 25 },
  { office: "CE, Wanaparthy", lascar: 0, helper: 0},
  { office: "CE, Karimnagar", lascar: 89, helper: 12 },
  { office: "CE, Jagityal", lascar: 7, helper: 1 },
  { office: "CE, Mancherial", lascar: 67, helper: 1 },
  { office: "CE, Ramagundam", lascar: 22, helper: 18 },
  { office: "CE, Gajwel", lascar: 0, helper: 0 },
  { office: "CE, Hyderabad", lascar: 9, helper: 5 }
];

const HeroSection: React.FC<JobsSectionProps> = ({ onApplyClick }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const totalLascar = jobLocations.reduce((sum, loc) => sum + loc.lascar, 0);
  const totalHelper = jobLocations.reduce((sum, loc) => sum + loc.helper, 0);

  const jobCategories = [
    {
      id: "lascar",
      title: "Lascar Services",
      count: totalLascar,
      icon: Users,
      description: "Field assistant positions for irrigation monitoring and maintenance",
      requirements: [
        "Basic knowledge of irrigation systems",
        "Physical fitness for field work",
        "Ability to maintain basic records",
        "Local language proficiency"
      ]
    },
    {
      id: "helper",
      title: "Helper Services",
      count: totalHelper,
      icon: Wrench,
      description: "Support staff for irrigation infrastructure maintenance",
      requirements: [
        "Basic technical knowledge",
        "Experience in maintenance work",
        "Team collaboration skills",
        "Willingness to work in field conditions"
      ]
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  {/* Hero Heading */}
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block text-blue-600">Professional</span>
                    <span className="block text-blue-600">Facility Management</span>
                  </h1>
                  {/* Hero Description */}
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    We are your trusted partner for facility management and hiring services. We provide and hire skilled workers, including security staff, bodyguards, salespeople, cashiers, and maintenance teams. Count on us for reliable services that ensure safety, efficiency, and smooth operations for businesses and individuals.
                  </p>
                  {/* Hero Buttons */}
                  <div className="mt-5 sm:mt-8 sm:flex sm:flex-col sm:items-center lg:items-start lg:flex-row lg:justify-start">
                    <div className="rounded-md shadow mb-4 lg:mb-0">
                      <a
                        href="#apply"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        Apply Now
                      </a>
                    </div>
                    <div className="rounded-md shadow lg:ml-4">
                      <a
                        href="#jobs"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10"
                      >
                        View Jobs
                      </a>
                    </div>
                  </div>
                  {/* Hero Additional Text */}
                  <div className="mt-10 sm:mt-12">
                    <h2 className="text-3xl font-bold text-green-600">
                      Irrigation & Command Area Development Department
                    </h2>
                    <p className="text-lg text-gray-600 mt-3">
                    Establishment - Irrigation & Command Area Development Department - Permission for engaging one thousand eight hundred and seventy eight (1,878) new services, i.e., one thousand five hundred and ninety-seven (1,597) Lascar services and two hundred and eighty one (281) Helper services on outsourcing basis, to work under the administrative control of Engineer In Chlef (Admn.), Irrigation and Command Area Development, Hyderabad, for a period upto 31.03.2025 - Accorded - Orders - Issued.                    </p>
                    <p className="text-lg text-gray-600 mt-3">
                      New jobs are now open! Apply for the latest opportunities to be part of our team.
                    </p>
                  </div>
                </div>
              </main>
            </div>
          </div>
          {/* Hero Image */}
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex justify-end items-center">
            <img
              className="h-[400px] w-[500px] object-contain border-4 border-orange-500"
              src="/img1.png" // Using the image from the public folder
              alt="Professional facility management"
            />
          </div>
        </div>
       
        <div className="overflow-hidden h-10 relative">
</div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
            <IndianRupee className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-semibold">Monthly Salary: ₹15,600</span>
          </div>
        </div>
        {/* Job Listings Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {jobCategories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className="flex items-center justify-between mb-6 cursor-pointer"
                onClick={() =>
                  setExpandedCategory(expandedCategory === category.id ? null : category.id)
                }
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <category.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900">{category.title}</h2>
                    <p className="text-blue-600 font-semibold">{category.count} Positions</p>
                  </div>
                </div>
                {expandedCategory === category.id ? (
                  <ChevronUp className="h-6 w-6 text-blue-600" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-blue-600" />
                )}
              </div>

              <p className="text-gray-700 mb-4">{category.description}</p>

              {expandedCategory === category.id && (
                <div className="mb-6 bg-white rounded-lg p-4 shadow-inner">
                  <h3 className="font-semibold text-gray-900 mb-3">Positions by Location:</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {jobLocations.map((location) => (
                      <div
                        key={location.office}
                        className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                      >
                        <span className="font-medium text-gray-800">{location.office}</span>
                        <span className="text-blue-600 font-semibold">
                          {category.id === "lascar" ? location.lascar : location.helper} positions
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {category.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                onClick={onApplyClick}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
