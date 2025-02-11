import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("rZQbUGME2D4X6Re5D");

// File validation function
export const validateFile = (file: File, isPassportPhoto: boolean = false): boolean => {
  const allowedFormats = ['image/jpeg', 'image/png', 'application/pdf'];
  const maxSize = isPassportPhoto ? 171000 : 500000; // 171KB for passport photo, 500KB for other files

  if (!allowedFormats.includes(file.type)) {
    alert('Invalid file format. Only JPG, PNG, and PDF are allowed.');
    return false;
  }

  if (file.size > maxSize) {
    alert(`File must be smaller than ${maxSize / 1000}KB`);
    return false;
  }

  return true;
};

// Function to compress image file
const compressImage = async (file: File): Promise<File> => {
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

        // Resize while maintaining aspect ratio
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
    reader.onerror = (error) => reject(error);
  });
};

interface EmailChunk {
  to_email: string;
  from_name: string;
  subject: string;
  message: string;
  files: Record<string, File>;
  [key: string]: unknown;
}

// Function to send email with attachments
export const sendEmailWithAttachments = async (formData: any, files: { [key: string]: File }) => {
  try {
    // Compress images before sending
    const compressedFiles: Record<string, File> = {};
    for (const [key, file] of Object.entries(files)) {
      if (file.type.startsWith('image/')) {
        compressedFiles[key] = await compressImage(file);
      } else {
        compressedFiles[key] = file;
      }
    }

    // Split the data into chunks if needed
    const chunks: EmailChunk[] = [];
    let currentChunk: EmailChunk = {
      to_email: 'bheemsociety@gmail.com',
      from_name: `${formData.firstName} ${formData.lastName}`,
      subject: `Job Application - ${formData.firstName} ${formData.lastName}`,
      message: generateEmailBody(formData),
      files: {}
    };

    let currentSize = new Blob([currentChunk.message]).size;
    const maxSize = 45000; // Keeping a buffer below 50KB

    for (const [key, file] of Object.entries(compressedFiles)) {
      const fileSize = file.size;
      if (currentSize + fileSize > maxSize) {
        chunks.push(currentChunk);
        currentChunk = {
          to_email: 'bheemsociety@gmail.com',
          from_name: `${formData.firstName} ${formData.lastName}`,
          subject: `Job Application (Continued) - ${formData.firstName} ${formData.lastName}`,
          message: 'Continued from previous email...',
          files: {}
        };
        currentSize = new Blob([currentChunk.message]).size;
      }
      currentChunk.files[key] = file;
      currentSize += fileSize;
    }
    chunks.push(currentChunk);

    // Send each chunk
    for (const chunk of chunks) {
      await emailjs.send(
        "service_frccd2d",
        "template_6z4229f",
        chunk
      );
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Helper function to generate email body
const generateEmailBody = (data: any): string => {
  return `
Job Application Details:

Personal Information:
-------------------
Name: ${data.firstName || ""}
Father's Name: ${data.fatherName || ""}
Date of Birth: ${data.dateOfBirth || ""}
Gender: ${data.gender || ""}
Category: ${data.category || ""}
Physically Handicapped: ${data.handicapped || ""}
Aadhar Number: ${data.adharnumber || ""}

Contact Information:
------------------
Email: ${data.email || ""}
Phone: ${data.phone || ""}
Address: ${data.address || ""}
City: ${data.city || ""}
Pincode: ${data.pincode || ""}

Educational Information:
---------------------
10th Details:
${data.tenthApplicable === 'yes' ? `
School: ${data.tenthBoard || ""}
Year: ${data.tenthYear || ""}
Percentage: ${data.tenthPercentage || ""}
` : 'Not Applicable'}

Intermediate Details:
${data.interApplicable === 'yes' ? `
College: ${data.interBoard || ""}
Year: ${data.interYear || ""}
Percentage: ${data.interPercentage || ""}
` : 'Not Applicable'}

Diploma Details:
${data.diplomaApplicable === 'yes' ? `
Institution: ${data.diplomaBoard || ""}
Year: ${data.diplomaYear || ""}
Percentage: ${data.diplomaPercentage || ""}
` : 'Not Applicable'}

Graduation Details:
${data.graduationApplicable === 'yes' ? `
University: ${data.graduationBoard || ""}
Year: ${data.graduationYear || ""}
Percentage: ${data.graduationPercentage || ""}
` : 'Not Applicable'}

Professional Information:
----------------------
Position Applied For: ${data.position || ""}
Total Experience: ${data.experience || ""} years
  `.trim();
};
