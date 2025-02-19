import React, { useState } from 'react';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    address: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean, message: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api-endpoint.com/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitResult({
          success: true,
          message: 'Application submitted successfully!'
        });
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          address: ''
        });
      } else {
        const errorData = await response.json();
        setSubmitResult({
          success: false,
          message: errorData.message || 'Failed to submit application. Please try again.'
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="apply" className="py-16">
      <h2 className="text-2xl font-bold text-center mb-6">Apply for a Position</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Position</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={handleChange}
          >
            <option value="">Select a position</option>
            <option value="Security Guards">Security Guards</option>
            <option value="Body Guards">Body Guards</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Sales Personnel">Sales Personnel</option>
            <option value="Cashiers">Cashiers</option>
            <option value="Facility Management">Facility Management</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            id="address"
            name="address"
            rows={4}
            value={formData.address}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={handleChange}
          ></textarea>
        </div>
        
        {submitResult && (
          <div className={`p-3 rounded-md ${submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submitResult.message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </section>
  );
}
