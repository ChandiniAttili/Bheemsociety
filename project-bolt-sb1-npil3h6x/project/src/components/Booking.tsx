import React, { useState, useRef } from 'react';

interface ApplicationFormProps {
  onSubmitSuccess?: () => void;
}

function App({ onSubmitSuccess }: ApplicationFormProps) {
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
    tenthBoard: '',
    tenthYear: '',
    tenthPercentage: '',
    interPercentage: '',
    interYear: '',
    interBoard: '',
    graduationBoard: '',
    graduationYear: '',
    graduationPercentage: '',
    diplomaBoard: '',
    diplomaPercentage: '',
    diplomaYear: '',
    languages: '',
    references: '',
    declaration: false,
    passportPhoto: null as File | null,
    tenthMemo: null as File | null,
    interMemo: null as File | null,
    diplomaMemo: null as File | null,
    graduationMemo: null as File | null
  });

  const photoInputRef = useRef<HTMLInputElement>(null);
  const tenthMemoRef = useRef<HTMLInputElement>(null);
  const interMemoRef = useRef<HTMLInputElement>(null);
  const diplomaMemoRef = useRef<HTMLInputElement>(null);
  const graduationMemoRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'tenthMemo' | 'interMemo' | 'diplomaMemo' | 'graduationMemo') => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedFormats = ['image/jpeg', 'application/pdf'];
      const maxSize = 500000; // 500KB for documents

      if (allowedFormats.indexOf(file.type) === -1) {
        alert('Invalid file format. Only JPG, JPEG, PNG, and PDF are allowed.');
        return;
      }
      if (file.size > maxSize) {
        alert('File is too large. Please upload a file smaller than 500 KB.');
        return;
      }

      setFormData(prev => ({
        ...prev,
        [fileType]: file
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 171000; // 171KB for passport photo
      if (file.size > maxSize) {
        alert('Photo is too large. Please upload a photo smaller than 171 KB.');
        return;
      }
      setFormData(prev => ({ ...prev, passportPhoto: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fileAttachments = [];
    
    if (formData.passportPhoto) {
      const photoBase64 = await convertFileToBase64(formData.passportPhoto);
      fileAttachments.push({
        name: 'Passport Photo',
        data: photoBase64
      });
    }

    if (formData.tenthMemo) {
      const tenthMemoBase64 = await convertFileToBase64(formData.tenthMemo);
      fileAttachments.push({
        name: '10th Memo',
        data: tenthMemoBase64
      });
    }

    if (formData.interMemo) {
      const interMemoBase64 = await convertFileToBase64(formData.interMemo);
      fileAttachments.push({
        name: 'Intermediate Memo',
        data: interMemoBase64
      });
    }

    if (formData.diplomaMemo) {
      const diplomaMemoBase64 = await convertFileToBase64(formData.diplomaMemo);
      fileAttachments.push({
        name: 'Diploma Memo',
        data: diplomaMemoBase64
      });
    }

    if (formData.graduationMemo) {
      const graduationMemoBase64 = await convertFileToBase64(formData.graduationMemo);
      fileAttachments.push({
        name: 'Graduation Memo',
        data: graduationMemoBase64
      });
    }

    const emailBody = `
      Job Application Details:
      
      Personal Information:
      Name: ${formData.firstName} ${formData.lastName}
      Father's Name: ${formData.fatherName}
      Date of Birth: ${formData.dateOfBirth}
      Gender: ${formData.gender}
      Category: ${formData.category}
      Physically Handicapped: ${formData.handicapped}
      Adhar Number: ${formData.adharnumber}
      
      Contact Information:
      Email: ${formData.email}
      Phone: ${formData.phone}
      Address: ${formData.address}
      City: ${formData.city}
      Pincode: ${formData.pincode}
      
      Educational Information:
      10th Details:
      School: ${formData.tenthBoard}
      Year: ${formData.tenthYear}
      Percentage: ${formData.tenthPercentage}
      
      Intermediate Details:
      College: ${formData.interBoard}
      Year: ${formData.interYear}
      Percentage: ${formData.interPercentage}
      
      Diploma Details:
      Board: ${formData.diplomaBoard}
      Year: ${formData.diplomaYear}
      Percentage: ${formData.diplomaPercentage}
      
      Graduation Details:
      University: ${formData.graduationBoard}
      Year: ${formData.graduationYear}
      Percentage: ${formData.graduationPercentage}
      
      Professional Information:
      Position Applied For: ${formData.position}
      Total Experience: ${formData.experience} years
    `;

    const encodedBody = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:bhemsociety@gmail.com?subject=New Job Application - ${formData.firstName} ${formData.lastName}&body=${encodedBody}`;

    window.location.href = mailtoLink;

    alert('Application submitted successfully! Your email client will open to send the application with all attachments.');
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

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-blue-900 border-b pb-2">Educational Information</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-700">10th Details</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={tenthMemoRef}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'tenthMemo')}
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => tenthMemoRef.current?.click()}
                  className="text-sm bg-gray-100 text-gray-700 py-1 px-3 rounded hover:bg-gray-200 border border-gray-300"
                >
                  Upload Mark Memo
                </button>
                {formData.tenthMemo && (
                  <span className="text-sm text-green-600">✓ {formData.tenthMemo.name}</span>
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
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-700">Intermediate Details</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={interMemoRef}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'interMemo')}
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => interMemoRef.current?.click()}
                  className="text-sm bg-gray-100 text-gray-700 py-1 px-3 rounded hover:bg-gray-200 border border-gray-300"
                >
                  Upload Mark Memo
                </button>
                {formData.interMemo && (
                  <span className="text-sm text-green-600">✓ {formData.interMemo.name}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="interBoard" className="block text-sm font-medium text-gray-700">College Name</label>
                <input
                  type="text"
                  id="interBoard"
                  name="interBoard"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="interYear" className="block text-sm font-medium text-gray-700">Year of Passing</label>
                <input
                  type="number"
                  id="interYear"
                  name="interYear"
                  required
                  min="1990"
                  max="2025"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="interPercentage" className="block text-sm font-medium text-gray-700">Percentage/CGPA</label>
                <input
                  type="number"
                  id="interPercentage"
                  name="interPercentage"
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
                  ref={diplomaMemoRef}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'diplomaMemo')}
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => diplomaMemoRef.current?.click()}
                  className="text-sm bg-gray-100 text-gray-700 py-1 px-3 rounded hover:bg-gray-200 border border-gray-300"
                >
                  Upload Mark Memo
                </button>
                {formData.diplomaMemo && (
                  <span className="text-sm text-green-600">✓ {formData.diplomaMemo.name}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="diplomaBoard" className="block text-sm font-medium text-gray-700">Board/University</label>
                <input
                  type="text"
                  id="diplomaBoard"
                  name="diplomaBoard"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="diplomaYear" className="block text-sm font-medium text-gray-700">Year of Passing</label>
                <input
                  type="number"
                  id="diplomaYear"
                  name="diplomaYear"
                  required
                  min="1990"
                  max="2025"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="diplomaPercentage" className="block text-sm font-medium text-gray-700">Percentage/CGPA</label>
                <input
                  type="number"
                  id="diplomaPercentage"
                  name="diplomaPercentage"
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
                  ref={graduationMemoRef}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'graduationMemo')}
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => graduationMemoRef.current?.click()}
                  className="text-sm bg-gray-100 text-gray-700 py-1 px-3 rounded hover:bg-gray-200 border border-gray-300"
                >
                  Upload Mark Memo
                </button>
                {formData.graduationMemo && (
                  <span className="text-sm text-green-600">✓ {formData.graduationMemo.name}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="graduationBoard" className="block text-sm font-medium text-gray-700">Board/University</label>
                <input
                  type="text"
                  id="graduationBoard"
                  name="graduationBoard"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">Year of Passing</label>
                <input
                  type="number"
                  id="graduationYear"
                  name="graduationYear"
                  required
                  min="1990"
                  max="2025"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="graduationPercentage" className="block text-sm font-medium text-gray-700">Percentage/CGPA</label>
                <input
                  type="number"
                  id="graduationPercentage"
                  name="graduationPercentage"
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
        </div>

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

export default App;