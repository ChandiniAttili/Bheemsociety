// Define FormData interface
interface formData {
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
  passportPhoto?: File;
  tenthApplicable: string;
  tenthBoard?: string;
  tenthYear?: string;
  tenthPercentage?: string;
  tenthMemo?: File;
  interApplicable: string;
  interBoard?: string;
  interYear?: string;
  interPercentage?: string;
  interMemo?: File;
  diplomaApplicable: string;
  diplomaBoard?: string;
  diplomaYear?: string;
  diplomaPercentage?: string;
  diplomaMemo?: File;
  graduationApplicable: string;
  graduationBoard?: string;
  graduationYear?: string;
  graduationPercentage?: string;
  graduationMemo?: File;
  // Booking form fields
  bookingDate?: string;
  bookingTime?: string;
  serviceType?: string;
  requirements?: string;
  preferredLocation?: string;
}

// Validate file type and size
export const validateFile = (file: File, isPassportPhoto: boolean): boolean => {
  const allowedExtensions = ["image/jpeg", "image/png", "application/pdf"];
  
  if (!allowedExtensions.includes(file.type)) {
    alert("Invalid file type. Only JPG, PNG, and PDF files are allowed.");
    return false;
  }

  const maxSize = isPassportPhoto ? 171000 : 500000; // 171KB for passport photo, 500KB for other files
  if (file.size > maxSize) {
    alert(`File size must be less than ${maxSize / 1000}KB`);
    return false;
  }

  return true;
};

// Convert file to Base64
const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Compress image if needed
const compressImage = async (file: File): Promise<File> => {
  if (!file.type.startsWith('image/')) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        const maxDimension = 800;

        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not compress image'));
              return;
            }
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            }));
          },
          'image/jpeg',
          0.7
        );
      };
    };
    reader.onerror = error => reject(error);
  });
};

// Generate email body
const generateEmailBody = (data: formData): string => {
  return `
Job Application Details:

Personal Information:
-------------------
Name: ${data.firstName} ${data.lastName}
Father's Name: ${data.fatherName}
Date of Birth: ${data.dateOfBirth}
Gender: ${data.gender}
Category: ${data.category}
Physically Handicapped: ${data.handicapped}
Aadhar Number: ${data.adharnumber}

Contact Information:
------------------
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}
City: ${data.city}
Pincode: ${data.pincode}

Educational Information:
---------------------
10th Details:
${data.tenthApplicable === 'yes' ? `
School: ${data.tenthBoard}
Year: ${data.tenthYear}
Percentage: ${data.tenthPercentage}
` : 'Not Applicable'}

Intermediate Details:
${data.interApplicable === 'yes' ? `
College: ${data.interBoard}
Year: ${data.interYear}
Percentage: ${data.interPercentage}
` : 'Not Applicable'}

Diploma Details:
${data.diplomaApplicable === 'yes' ? `
Institution: ${data.diplomaBoard}
Year: ${data.diplomaYear}
Percentage: ${data.diplomaPercentage}
` : 'Not Applicable'}

Graduation Details:
${data.graduationApplicable === 'yes' ? `
University: ${data.graduationBoard}
Year: ${data.graduationYear}
Percentage: ${data.graduationPercentage}
` : 'Not Applicable'}

Professional Information:
----------------------
Position Applied For: ${data.position}
Total Experience: ${data.experience} years

Booking Information:
------------------
${data.bookingDate ? `Preferred Date: ${data.bookingDate}` : ''}
${data.bookingTime ? `Preferred Time: ${data.bookingTime}` : ''}
${data.serviceType ? `Service Type: ${data.serviceType}` : ''}
${data.preferredLocation ? `Preferred Location: ${data.preferredLocation}` : ''}
${data.requirements ? `Special Requirements: ${data.requirements}` : ''}
`.trim();
};

// Send email with attachments
export const sendEmailWithAttachments = async (formData: formData): Promise<boolean> => {
  try {
    // Prepare files for upload
    const attachments: Record<string, string> = {};

    // Handle passport photo
    if (formData.passportPhoto) {
      const compressedPhoto = await compressImage(formData.passportPhoto);
      attachments.passportPhoto = await fileToBase64(compressedPhoto);
    }

    // Handle education documents
    const documentFields = ['tenthMemo', 'interMemo', 'diplomaMemo', 'graduationMemo'] as const;
    for (const field of documentFields) {
      const file = formData[field];
      if (file) {
        attachments[field] = await fileToBase64(file);
      }
    }

    // Prepare API payload
    const payload = {
      to: 'bhemsociety@gmail.com',
      subject: `Job Application - ${formData.firstName} ${formData.lastName}`,
      body: generateEmailBody(formData),
      attachments
    };

    // Send request to API
    const response = await fetch('https://mailapis-3v2b.onrender.com/api/v1/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return true;
    } else {
      throw new Error(result.message || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error sending application:', error);
    throw error;
  }
};

export type { formData };
