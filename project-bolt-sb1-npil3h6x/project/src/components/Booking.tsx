import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  handicapped: string;
  aadharNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  position: string;
  experience: string;

  // Education Details
  tenthBoard: string;
  tenthYear: string;
  tenthPercentage: string;
  interApplicable: string;
  interBoard: string;
  interYear: string;
  interPercentage: string;
  diplomaApplicable: string;
  diplomaBoard: string;
  diplomaYear: string;
  diplomaPercentage: string;
  graduateApplicable: string;
  graduateBoard: string;
  graduateYear: string;
  graduatePercentage: string;
}

interface FileData {
  passportSizePhoto: File | null;
  tenthMarks: File | null;
  interMarks: File | null;
  diplomaMarks: File | null;
  graduateMarks: File | null;
}

interface ApplicationFormProps {
  onSubmitSuccess: () => void;
}

function ApplicationForm({ onSubmitSuccess }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    fatherName: '',
    dateOfBirth: '',
    gender: '',
    category: '',
    handicapped: 'No',
    aadharNumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    position: '',
    experience: '',
    tenthBoard: '',
    tenthYear: '',
    tenthPercentage: '',
    interApplicable: 'no',
    interBoard: '',
    interYear: '',
    interPercentage: '',
    diplomaApplicable: 'no',
    diplomaBoard: '',
    diplomaYear: '',
    diplomaPercentage: '',
    graduateApplicable: 'no',
    graduateBoard: '',
    graduateYear: '',
    graduatePercentage: ''
  });

  const [files, setFiles] = useState<FileData>({
    passportSizePhoto: null,
    tenthMarks: null,
    interMarks: null,
    diplomaMarks: null,
    graduateMarks: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: fileList[0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
  
    // Validation for required files
    if (!files.passportSizePhoto || !files.tenthMarks) {
      setMessage("Please upload passport photo and 10th marks memo.");
      setIsSubmitting(false);
      return;
    }
  
    // Validation checks for optional education levels
    if (formData.interApplicable === "yes" && (!files.interMarks || !formData.interYear)) {
      setMessage("Please complete all Intermediate details including marks memo.");
      setIsSubmitting(false);
      return;
    }
  
    if (formData.diplomaApplicable === "yes" && (!files.diplomaMarks || !formData.diplomaYear)) {
      setMessage("Please complete all Diploma details including marks memo.");
      setIsSubmitting(false);
      return;
    }
  
    if (formData.graduateApplicable === "yes" && (!files.graduateMarks || !formData.graduateYear)) {
      setMessage("Please complete all Graduation details including marks memo.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const formDataToSend = new FormData();
  
      // Create a detailed education summary
      const educationSummary = `
  **Educational Details**
  
  1. 10th Class
  - Board: ${formData.tenthBoard}
  - Year: ${formData.tenthYear}
  - Percentage: ${formData.tenthPercentage}%
  
  ${formData.interApplicable === 'yes' ? `
  2. Intermediate
  - Board: ${formData.interBoard}
  - Year: ${formData.interYear}
  - Percentage: ${formData.interPercentage}%
  ` : '2. Intermediate: Not Applicable'}
  
  ${formData.diplomaApplicable === 'yes' ? `
  3. Diploma
  - Board: ${formData.diplomaBoard}
  - Year: ${formData.diplomaYear}
  - Percentage: ${formData.diplomaPercentage}%
  ` : '3. Diploma: Not Applicable'}
  
  ${formData.graduateApplicable === 'yes' ? `
  4. Graduation
  - University: ${formData.graduateBoard}
  - Year: ${formData.graduateYear}
  - Percentage: ${formData.graduatePercentage}%
  ` : '4. Graduation: Not Applicable'}
      `;
  
      // Construct full email body
      const emailBody = `
  **Application for ${formData.position}**
  
  **Personal Information**
  - Name: ${formData.firstName} ${formData.lastName}
  - Father's Name: ${formData.fatherName}
  - Date of Birth: ${formData.dateOfBirth}
  - Gender: ${formData.gender}
  - Category: ${formData.category}
  - Handicapped: ${formData.handicapped}
  - Aadhar Number: ${formData.aadharNumber}
  
  **Contact Information**
  - Email: ${formData.email}
  - Phone: ${formData.phone}
  - Address: ${formData.address}
  - City: ${formData.city}
  - Pincode: ${formData.pincode}
  
  **Professional Information**
  - Position Applied For: ${formData.position}
  - Experience: ${formData.experience} years
  
  ${educationSummary}
  
  Note: Educational certificates and passport size photo are attached with this email.
      `;
  
      // Append email details
      formDataToSend.append('to', 'bhemsociety@gmail.com');
      formDataToSend.append('subject', `Job Application - ${formData.position} - ${formData.firstName} ${formData.lastName}`);
      formDataToSend.append('body', emailBody);
  
      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });
  
      // Append all files with specific names
      if (files.passportSizePhoto) {
        formDataToSend.append('passportSizePhoto', files.passportSizePhoto, 'passport_photo.' + files.passportSizePhoto.name.split('.').pop());
      }
      if (files.tenthMarks) {
        formDataToSend.append('tenthMarks', files.tenthMarks, '10th_marks.' + files.tenthMarks.name.split('.').pop());
      }
      if (files.interMarks && formData.interApplicable === 'yes') {
        formDataToSend.append('interMarks', files.interMarks, 'inter_marks.' + files.interMarks.name.split('.').pop());
      }
      if (files.diplomaMarks && formData.diplomaApplicable === 'yes') {
        formDataToSend.append('diplomaMarks', files.diplomaMarks, 'diploma_marks.' + files.diplomaMarks.name.split('.').pop());
      }
      if (files.graduateMarks && formData.graduateApplicable === 'yes') {
        formDataToSend.append('graduateMarks', files.graduateMarks, 'graduate_marks.' + files.graduateMarks.name.split('.').pop());
      }
  
      const response = await fetch('https://mailapis-3v2b.onrender.com/api/v1/mail/send', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error('Submission failed');
      }
  
      setMessage('Application submitted successfully!');
      setIsSubmitted(true);
      onSubmitSuccess();
    } catch (error) {
      setMessage('Failed to submit application. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-center mb-8">
        <Send className="w-8 h-8 text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Job Application Form</h1>
      </div>

      {message && (
        <div
          className={`mb-4 p-4 rounded ${
            message.includes('success')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Professional Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position Applied For
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Position</option>
                <option value="lascar">Lascar</option>
                <option value="helper">Helper</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Experience (years)
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                min="0"
                step="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Father's Name
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Handicapped
              </label>
              <select
                name="handicapped"
                value={formData.handicapped}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Aadhar Number
              </label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                required
                pattern="[0-9]{12}"
                title="Please enter a valid 12-digit Aadhar number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                pattern="[0-9]{6}"
                title="Please enter a valid 6-digit pincode"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Educational Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Educational Information</h2>
          
          {/* 10th Class */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">10th Class</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Board
                </label>
                <input
                  type="text"
                  name="tenthBoard"
                  value={formData.tenthBoard}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  type="text"
                  name="tenthYear"
                  value={formData.tenthYear}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{4}"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Percentage
                </label>
                <input
                  type="number"
                  name="tenthPercentage"
                  value={formData.tenthPercentage}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Memo
                </label>
                <input
                  type="file"
                  name="tenthMarks"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-1 block w-full"
                />
              </div>
            </div>
          </div>

          {/* Intermediate */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Intermediate</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Did you complete Intermediate?
              </label>
              <div className="flex space-x-4 mt-1">
                <label>
                  <input
                    type="radio"
                    name="interApplicable"
                    value="yes"
                    checked={formData.interApplicable === "yes"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="interApplicable"
                    value="no"
                    checked={formData.interApplicable === "no"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {formData.interApplicable === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Board
                  </label>
                  <input
                    type="text"
                    name="interBoard"
                    value={formData.interBoard}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Year
                  </label>
                  <input
                    type="number"
                    name="interYear"
                    value={formData.interYear}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Percentage
                  </label>
                  <input
                    type="number"
                    name="interPercentage"
                    value={formData.interPercentage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Memo
                  </label>
                  <input
                    type="file"
                    name="interMarks"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Diploma */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Diploma</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Did you complete a Diploma?
              </label>
              <div className="flex space-x-4 mt-1">
                <label>
                  <input
                    type="radio"
                    name="diplomaApplicable"
                    value="yes"
                    checked={formData.diplomaApplicable === "yes"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="diplomaApplicable"
                    value="no"
                    checked={formData.diplomaApplicable === "no"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {formData.diplomaApplicable === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Board
                  </label>
                  <input
                    type="text"
                    name="diplomaBoard"
                    value={formData.diplomaBoard}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Year
                  </label>
                  <input
                    type="number"
                    name="diplomaYear"
                    value={formData.diplomaYear}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Percentage
                  </label>
                  <input
                    type="number"
                    name="diplomaPercentage"
                    value={formData.diplomaPercentage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Memo
                  </label>
                  <input
                    type="file"
                    name="diplomaMarks"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Graduation */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Graduation</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Did you complete Graduation?
              </label>
              <div className="flex space-x-4 mt-1">
                <label>
                  <input
                    type="radio"
                    name="graduateApplicable"
                    value="yes"
                    checked={formData.graduateApplicable === "yes"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="graduateApplicable"
                    value="no"
                    checked={formData.graduateApplicable === "no"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {formData.graduateApplicable === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Board/University
                  </label>
                  <input
                    type="text"
                    name="graduateBoard"
                    value={formData.graduateBoard}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Year
                  </label>
                  <input
                    type="number"
                    name="graduateYear"
                    value={formData.graduateYear}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Percentage
                  </label>
                  <input
                    type="number"
                    name="graduatePercentage"
                    value={formData.graduatePercentage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Memo
                  </label>
                  <input
                    type="file"
                    name="graduateMarks"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Photo Upload</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Passport Size Photo
            </label>
            <input
              type="file"
              name="passportSizePhoto"
              onChange={handleFileChange}
              required
              accept=".jpg,.jpeg,.png"
              className="mt-1 block w-full"
            />
            <p className="mt-1 text-sm text-gray-500">
              Please upload a recent passport size photograph
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : isSubmitted ? 'Submitted' : 'Submit Application'}
            <Send className="ml-2" size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;