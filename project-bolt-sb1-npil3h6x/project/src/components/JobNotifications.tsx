import React from 'react';
import { BriefcaseIcon, MapPinIcon, ClockIcon } from 'lucide-react';

const jobs = [
  {
    title: 'Security Guards',
    location: 'Hyderabad',
    type: 'Full Time',
    positions: 'Multiple Positions Available',
  },
  {
    title: 'Body Guards',
    location: 'Hyderabad',
    type: 'Full Time',
    positions: 'Multiple Positions Available',
  },
  {
    title: 'Housekeeping Staff',
    location: 'Hyderabad',
    type: 'Full Time',
    positions: 'Multiple Positions Available',
  },
  {
    title: 'Sales Personnel',
    location: 'Hyderabad',
    type: 'Full Time',
    positions: 'Multiple Positions Available',
  },
  {
    title: 'Cashiers',
    location: 'Hyderabad',
    type: 'Full Time',
    positions: 'Multiple Positions Available',
  },
  {
    title: 'Facility Management Staff',
    location: 'Hyderabad',
    type: 'Full Time',
    positions: 'Multiple Positions Available',
  }
];

export default function JobNotifications() {
  return (
    <section id="jobs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Job Openings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">{job.title}</h3>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>{job.type}</span>
                </div>
                <p className="font-medium text-blue-600">{job.positions}</p>
              </div>
              <a 
                href="#apply" 
                className="mt-4 inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}