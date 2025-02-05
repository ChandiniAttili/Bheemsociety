import React, { useState, useRef } from 'react';

interface ApplicationFormProps {
  onSubmitSuccess?: () => void;
}

export default function ApplicationForm({ onSubmitSuccess }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    category: '',
    handicapped: '',
    adharnumber: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    education: '',
    university: '',
    yearOfPassing: '',
    percentage: '',
    position: '',
    experience: '',
    currentEmployer: '',
    currentSalary: '',
    expectedSalary: '',
    resume: '',
    idProof: '',
    photo: '',
    languages: '',
    references: '',
    declaration: false,
    passportPhoto: null as File | null,
    tenthMemo: null as File | null
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const memoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, passportPhoto: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, tenthMemo: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email body with form data
    const emailBody = `
New Job Application

Personal Information:
- Full Name: ${formData.firstName} ${formData.lastName}
- Father's Name: ${formData.fatherName}
- Date of Birth: ${formData.dateOfBirth}
- Gender: ${formData.gender}
- Category: ${formData.category}
- Handicapped: ${formData.handicapped}
- Andharnumber: ${formData.adharnumber}

Contact Information:
- Email: ${formData.email}
- Phone: ${formData.phone}
- Address: ${formData.address}
- City: ${formData.city}
- Pincode: ${formData.pincode}

Educational Information:
- Highest Qualification: ${formData.education}
- University/Board: ${formData.university}
- Year of Passing: ${formData.yearOfPassing}
- Percentage/CGPA: ${formData.percentage}

Professional Information:
- Position Applied For: ${formData.position}
- Total Experience: ${formData.experience} years
    `.trim();

    // Encode the email body for the mailto link
    const encodedBody = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:bhemsociety@gmail.com?subject=New Job Application - ${formData.firstName} ${formData.lastName}&body=${encodedBody}`;

    // Open the email client
    window.location.href = mailtoLink;

    // Show success message and close form
    alert('Application submitted successfully! Your email client will open to send the application.');
    onSubmitSuccess?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-3xl font-bold text-blue-900">Job Application Form</h2>
        <div className="w-32">
          <div className="relative">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Passport Photo"
                  className="w-full h-40 object-cover rounded"
                />
              ) : (
                <div className="h-40 flex items-center justify-center bg-gray-50 rounded">
                  <span className="text-sm text-gray-500">Upload Photo</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={photoInputRef}
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              required
            />
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="mt-2 w-full text-sm bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700"
            >
              Choose Photo
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-blue-900 border-b pb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father's Name</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="handicapped" className="block text-sm font-medium text-gray-700">Physical Handicapped</label>
              <select
                id="handicapped"
                name="handicapped"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                name="category"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="general">General</option>
                <option value="OC">OC</option>
                <option value="BC-A">BC-A</option>
                <option value="BC-B">BC-B</option>
                <option value="BC-C">BC-C</option>
                <option value="BC-D">BC-D</option>
                <option value="BC-E">BC-E</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
              </select>
            </div>
            <div>
              <label htmlFor="adharnumber" className="block text-sm font-medium text-gray-700">Adhar Number</label>
              <input
                type="text"
                id="adharnumber"
                name="adharnumber"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-blue-900 border-b pb-2">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                id="address"
                name="address"
                rows={3}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Educational Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-blue-900 border-b pb-2">Educational Information</h3>
          
          {/* 10th Details with Mark Memo Upload */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-700">10th Details</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={memoInputRef}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleMemoChange}
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => memoInputRef.current?.click()}
                  className="text-sm bg-gray-100 text-gray-700 py-1 px-3 rounded hover:bg-gray-200 border border-gray-300"
                >
                  Upload Mark Memo
                </button>
                {formData.tenthMemo && (
                  <span className="text-sm text-green-600">✓ Uploaded</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tenthBoard" className="block text-sm font-medium text-gray-700">School Name</label>
                <input
                  type="text"
                  id="tenthBoard"
                  name="tenthBoard"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthYear" className="block text-sm font-medium text-gray-700">Year of Passing</label>
                <input
                  type="number"
                  id="tenthYear"
                  name="tenthYear"
                  required
                  min="1990"
                  max="2025"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthPercentage" className="block text-sm font-medium text-gray-700">Percentage/CGPA</label>
                <input
                  type="number"
                  id="tenthPercentage"
                  name="tenthPercentage"
                  required
                  step="0.01"
                  min="0"
                  max="100"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-700">Intermediate Details</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={memoInputRef}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleMemoChange}
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => memoInputRef.current?.click()}
                  className="text-sm bg-gray-100 text-gray-700 py-1 px-3 rounded hover:bg-gray-200 border border-gray-300"
                >
                  Upload Mark Memo
                </button>
                {formData.tenthMemo && (
                  <span className="text-sm text-green-600">✓ Uploaded</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tenthBoard" className="block text-sm font-medium text-gray-700">College Name</label>
                <input
                  type="text"
                  id="tenthBoard"
                  name="tenthBoard"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthBoard" className="block text-sm font-medium text-gray-700">Branch</label>
                <input
                  type="text"
                  id="tenthBoard"
                  name="tenthBoard"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthYear" className="block text-sm font-medium text-gray-700">Year of Passing</label>
                <input
                  type="number"
                  id="tenthYear"
                  name="tenthYear"
                  required
                  min="1990"
                  max="2025"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthPercentage" className="block text-sm font-medium text-gray-700">Percentage/CGPA</label>
                <input
                  type="number"
                  id="tenthPercentage"
                  name="tenthPercentage"
                  required
                  step="0.01"
                  min="0"
                  max="100"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-700">Diploma</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={memoInputRef}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleMemoChange}
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => memoInputRef.current?.click()}
                  className="text-sm bg-gray-100 text-gray-700 py-1 px-3 rounded hover:bg-gray-200 border border-gray-300"
                >
                  Upload Mark Memo
                </button>
                {formData.tenthMemo && (
                  <span className="text-sm text-green-600">✓ Uploaded</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tenthBoard" className="block text-sm font-medium text-gray-700">College/University</label>
                <input
                  type="text"
                  id="tenthBoard"
                  name="tenthBoard"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthBoard" className="block text-sm font-medium text-gray-700">Branch</label>
                <input
                  type="text"
                  id="tenthBoard"
                  name="tenthBoard"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthYear" className="block text-sm font-medium text-gray-700">Year of Passing</label>
                <input
                  type="number"
                  id="tenthYear"
                  name="tenthYear"
                  required
                  min="1990"
                  max="2025"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthPercentage" className="block text-sm font-medium text-gray-700">Percentage/CGPA</label>
                <input
                  type="number"
                  id="tenthPercentage"
                  name="tenthPercentage"
                  required
                  step="0.01"
                  min="0"
                  max="100"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-700">Graduation</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={memoInputRef}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleMemoChange}
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => memoInputRef.current?.click()}
                  className="text-sm bg-gray-100 text-gray-700 py-1 px-3 rounded hover:bg-gray-200 border border-gray-300"
                >
                  Upload Mark Memo
                </button>
                {formData.tenthMemo && (
                  <span className="text-sm text-green-600">✓ Uploaded</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tenthBoard" className="block text-sm font-medium text-gray-700">College/University</label>
                <input
                  type="text"
                  id="tenthBoard"
                  name="tenthBoard"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthBoard" className="block text-sm font-medium text-gray-700">Branch</label>
                <input
                  type="text"
                  id="tenthBoard"
                  name="tenthBoard"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthYear" className="block text-sm font-medium text-gray-700">Year of Passing</label>
                <input
                  type="number"
                  id="tenthYear"
                  name="tenthYear"
                  required
                  min="1990"
                  max="2025"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="tenthPercentage" className="block text-sm font-medium text-gray-700">Percentage/CGPA</label>
                <input
                  type="number"
                  id="tenthPercentage"
                  name="tenthPercentage"
                  required
                  step="0.01"
                  min="0"
                  max="100"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
                <div>
                  
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-900 border-b pb-2">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position Applied For</label>
                <select
                  id="position"
                  name="position"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="">Select Position</option>
                  <option value="lascar">Lascar Services</option>
                  <option value="helper">Helper Services</option>
                </select>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Total Experience (Years)</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="declaration"
                name="declaration"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="declaration" className="font-medium text-gray-700">
                Declaration
              </label>
              <p className="text-gray-500">I hereby declare that all the information provided above is true to the best of my knowledge.</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}