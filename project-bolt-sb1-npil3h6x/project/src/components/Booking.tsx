import React, { useState, useRef } from 'react';
import { validateFile, sendEmailWithAttachments } from '../lib/api';

interface ApplicationFormProps {
  onSubmitSuccess?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  handicapped: string;
  adharnumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  position: string;
  experience: string;
  passportPhoto: File | null;
  tenthApplicable: string;
  tenthBoard: string;
  tenthYear: string;
  tenthPercentage: string;
  tenthMemo: File | null;
  interApplicable: string;
  interBoard: string;
  interYear: string;
  interPercentage: string;
  interMemo: File | null;
  diplomaApplicable: string;
  diplomaBoard: string;
  diplomaYear: string;
  diplomaPercentage: string;
  diplomaMemo: File | null;
  graduationApplicable: string;
  graduationBoard: string;
  graduationYear: string;
  graduationPercentage: string;
  graduationMemo: File | null;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  fatherName: '',
  dateOfBirth: '',
  gender: '',
  category: '',
  handicapped: 'no',
  adharnumber: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  position: '',
  experience: '',
  passportPhoto: null,
  tenthApplicable: 'yes',
  tenthBoard: '',
  tenthYear: '',
  tenthPercentage: '',
  tenthMemo: null,
  interApplicable: 'yes',
  interBoard: '',
  interYear: '',
  interPercentage: '',
  interMemo: null,
  diplomaApplicable: 'no',
  diplomaBoard: 'N/A',
  diplomaYear: 'N/A',
  diplomaPercentage: 'N/A',
  diplomaMemo: null,
  graduationApplicable: 'yes',
  graduationBoard: '',
  graduationYear: '',
  graduationPercentage: '',
  graduationMemo: null
};

export default function BookingForm({ onSubmitSuccess }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const fileRefs = {
    photo: useRef<HTMLInputElement>(null),
    tenthMemo: useRef<HTMLInputElement>(null),
    interMemo: useRef<HTMLInputElement>(null),
    diplomaMemo: useRef<HTMLInputElement>(null),
    graduationMemo: useRef<HTMLInputElement>(null)
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // Required field validation
    const requiredFields: Array<keyof FormData> = [
      'firstName', 'lastName', 'fatherName', 'dateOfBirth', 'gender',
      'category', 'email', 'phone', 'address', 'city', 'pincode',
      'position', 'experience', 'passportPhoto'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Aadhar validation
    if (formData.adharnumber && !/^\d{12}$/.test(formData.adharnumber)) {
      newErrors.adharnumber = 'Please enter a valid 12-digit Aadhar number';
    }

    // Education section validation
    const validateEducation = (section: string) => {
      if (formData[`${section}Applicable` as keyof FormData] === 'yes') {
        if (!formData[`${section}Board` as keyof FormData]) 
          newErrors[`${section}Board` as keyof FormData] = 'Board/University is required';
        if (!formData[`${section}Year` as keyof FormData]) 
          newErrors[`${section}Year` as keyof FormData] = 'Year is required';
        if (!formData[`${section}Percentage` as keyof FormData]) 
          newErrors[`${section}Percentage` as keyof FormData] = 'Percentage is required';
        if (!formData[`${section}Memo` as keyof FormData]) 
          newErrors[`${section}Memo` as keyof FormData] = 'Please upload memo';
      }
    };

    ['tenth', 'inter', 'diploma', 'graduation'].forEach(validateEducation);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplicableChange = (e: React.ChangeEvent<HTMLSelectElement>, section: string) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [`${section}Applicable`]: value,
      ...(value === 'no' && {
        [`${section}Board`]: 'N/A',
        [`${section}Year`]: 'N/A',
        [`${section}Percentage`]: 'N/A',
        [`${section}Memo`]: null
      })
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof FormData) => {
    const file = e.target.files?.[0];
    if (file) {
      const isPassportPhoto = fileType === 'passportPhoto';
      if (!validateFile(file, isPassportPhoto)) {
        return;
      }

      setFormData(prev => ({
        ...prev,
        [fileType]: file
      }));

      if (isPassportPhoto) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

      setErrors(prev => ({
        ...prev,
        [fileType]: undefined
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    setIsSubmitting(true);

    try {
      const files: { [key: string]: File } = {};
      
      if (formData.passportPhoto) {
        files.passportPhoto = formData.passportPhoto;
      }

      const educationSections = ['tenth', 'inter', 'diploma', 'graduation'];
      for (const section of educationSections) {
        if (formData[`${section}Applicable` as keyof FormData] === 'yes' && 
            formData[`${section}Memo` as keyof FormData]) {
          files[`${section}Memo`] = formData[`${section}Memo` as keyof FormData] as File;
        }
      }

      await sendEmailWithAttachments(formData, files);
      onSubmitSuccess?.();
      alert('Application submitted successfully! Your email client will open to send the application.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderEducationSection = (
    section: string,
    title: string,
    institutionLabel: string
  ) => {
    const applicable = formData[`${section}Applicable` as keyof FormData];
    
    return (
      <div className="space-y-4 border-b pb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <select
            name={`${section}Applicable`}
            value={applicable as string}
            onChange={(e) => handleApplicableChange(e, section)}
            className="border rounded px-3 py-1"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {applicable === 'yes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {institutionLabel}
              </label>
              <input
                type="text"
                name={`${section}Board`}
                value={formData[`${section}Board` as keyof FormData] as string}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors[`${section}Board` as keyof FormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`${section}Board` as keyof FormData]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="text"
                name={`${section}Year`}
                value={formData[`${section}Year` as keyof FormData] as string}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors[`${section}Year` as keyof FormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`${section}Year` as keyof FormData]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Percentage
              </label>
              <input
                type="text"
                name={`${section}Percentage`}
                value={formData[`${section}Percentage` as keyof FormData] as string}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors[`${section}Percentage` as keyof FormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`${section}Percentage` as keyof FormData]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Memo
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, `${section}Memo` as keyof FormData)}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full"
              />
              {errors[`${section}Memo` as keyof FormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`${section}Memo` as keyof FormData]}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Personal Information Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.fatherName && (
              <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Physically Handicapped</label>
            <select
              name="handicapped"
              value={formData.handicapped}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Aadhar Number</label>
            <input
              type="text"
              name="adharnumber"
              value={formData.adharnumber}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              maxLength={12}
            />
            {errors.adharnumber && (
              <p className="text-red-500 text-sm mt-1">{errors.adharnumber}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              maxLength={10}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              maxLength={6}
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
            )}
          </div>
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">Passport Photo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Photo (Max size: 171KB)
            </label>
            <input
              type="file"
              ref={fileRefs.photo}
              onChange={(e) => handleFileUpload(e, 'passportPhoto')}
              accept=".jpg,.jpeg,.png"
              className="w-full"
            />
            {errors.passportPhoto && (
              <p className="text-red-500 text-sm mt-1">{errors.passportPhoto}</p>
            )}
          </div>

          {photoPreview && (
            <div>
              <p className="text-sm font-medium mb-1">Preview</p>
              <img
                src={photoPreview}
                alt="Passport Photo Preview"
                className="w-32 h-40 object-cover border"
              />
            </div>
          )}
        </div>
      </div>

      {/* Educational Information Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">Educational Information</h2>
        
        {renderEducationSection('tenth', '10th Class', 'School Name')}
        {renderEducationSection('inter', 'Intermediate', 'College Name')}
        {renderEducationSection('diploma', 'Diploma', 'Institution Name')}
        {renderEducationSection('graduation', 'Graduation', 'University Name')}
      </div>

      {/* Professional Information Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">Professional Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Position Applied For</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Position</option>
              <option value="lascar">Lascar Services</option>
              <option value="helper">Helper Services</option>
            </select>
            {errors.position && (
              <p className="text-red-500 text-sm mt-1">{errors.position}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              step="0.5"
              className="w-full border rounded px-3 py-2"
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}