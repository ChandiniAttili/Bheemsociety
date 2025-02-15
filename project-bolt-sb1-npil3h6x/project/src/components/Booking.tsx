
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
  hasIntermediate: string; // Yes or No
  interBoard: string;
  interApplicable:string,
  interYear: string;
  interPercentage: string;
  hasDiploma: string; // Yes or No
  diplomaBoard: string;
  diplomaYear: string;
  diplomaPercentage: string;
  graduationBoard: string;
  graduationYear: string;
  diplomaApplicable:string;
  graduationPercentage: string;
}

interface FileData {
  passportSizePhoto: File | null;
  tenthMarks: File | null;
  interMarks: File | null;
  diplomaMarks: File | null;
  degreeMarks: File | null;
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
    hasIntermediate: 'No',
    interBoard: '',
    interYear: '',
    interApplicable:'',
    interPercentage: '',
    hasDiploma: 'No',
    diplomaApplicable:'',
    diplomaBoard: '',
    diplomaYear: '',
    diplomaPercentage: '',
    graduationBoard: '',
    graduationYear: '',
    graduationPercentage: '',
  });

  const [files, setFiles] = useState<FileData>({
    passportSizePhoto: null,
    tenthMarks: null,
    interMarks: null,
    diplomaMarks: null,
    degreeMarks: null,
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
  
    // ✅ Validation for Intermediate
    if (
      formData.interApplicable === "yes" && // Only validate if "Yes" is selected
      (!formData.interYear.trim() || 
       !formData.interPercentage.trim() || 
       !files.interMarks)
    ) {
      setMessage("Please enter complete Intermediate details (Year, Percentage, and Upload Memo).");
      setIsSubmitting(false);
      return;
    }
  
    // ✅ Validation for Diploma
    if (
      formData.diplomaApplicable === "yes" && // Only validate if "Yes" is selected
      (!formData.diplomaYear.trim() || 
       !formData.diplomaPercentage.trim() || 
       !files.diplomaMarks)
    ) {
      setMessage("Please enter complete Diploma details (Year, Percentage, and Upload Memo).");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      const emailBody = `
**Personal Information**
- First Name: ${formData.firstName}
- Last Name: ${formData.lastName}
- Father's Name: ${formData.fatherName}
- Date of Birth: ${formData.dateOfBirth}
- Gender: ${formData.gender}
- Category: ${formData.category}
- Handicapped: ${formData.handicapped}
- Aadhar Number: ${formData.aadharNumber}

**Contact Information**
- Email: ${formData.email}
- Phone: ${formData.phone}
- Address: ${formData.address}, ${formData.city}, ${formData.pincode}

**Educational Information**
- 10th: ${formData.tenthBoard}, ${formData.tenthYear}, ${formData.tenthPercentage}%
- Intermediate: ${formData.interBoard}, ${formData.interYear}, ${formData.interPercentage}%
- Diploma: ${formData.diplomaBoard}, ${formData.diplomaYear}, ${formData.diplomaPercentage}%
- Graduation: ${formData.graduationBoard}, ${formData.graduationYear}, ${formData.graduationPercentage}%

**Professional Information**
- Position Applied For: ${formData.position}
- Experience: ${formData.experience}
      `;

      // Append email details
      formDataToSend.append('to', 'bhemsociety@gmail.com');
      formDataToSend.append('subject', `Application for ${formData.position}`);
      formDataToSend.append('body', emailBody);

      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append all files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formDataToSend.append(key, file);
        }
      });

      const response = await fetch(
        'https://mailapis-3v2b.onrender.com/api/v1/mail/send',
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setMessage('Application submitted successfully!');
      setIsSubmitted(true);
      onSubmitSuccess();
    } catch (error) {
      setMessage('Failed to submit application. Please try again.');
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

  {/* Yes/No Selection */}
  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700">Did you complete Intermediate?</label>
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

  {/* Intermediate Fields - Only shown if "Yes" is selected */}
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
        <label className="block text-sm font-medium text-gray-700">Year</label>
        <input
          type="number"
          name="interYear"
          value={formData.interYear}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Percentage</label>
        <input
          type="number"
          name="interPercentage"
          value={formData.interPercentage}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-gray-700">Upload Memo</label>
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

  {/* Yes/No Selection */}
  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700">Did you complete a Diploma?</label>
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

  {/* Diploma Fields - Only shown if "Yes" is selected */}
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
        <label className="block text-sm font-medium text-gray-700">Year</label>
        <input
          type="number"
          name="diplomaYear"
          value={formData.diplomaYear}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Percentage</label>
        <input
          type="number"
          name="diplomaPercentage"
          value={formData.diplomaPercentage}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-gray-700">Upload Memo</label>
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
          <div>
            <h3 className="text-lg font-medium mb-3">Graduation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  University
                </label>
                <input
                  type="text"
                  name="graduationBoard"
                  value={formData.graduationBoard}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  type="text"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  pattern="[0-9]{4}"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Percentage
                </label>
                <input
                  type="number"
                  name="graduationPercentage"
                  value={formData.graduationPercentage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Degree Certificate
                </label>
                <input
                  type="file"
                  name="degreeMarks"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-1 block w-full"
                />
              </div>
            </div>
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

        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}

export default ApplicationForm;
