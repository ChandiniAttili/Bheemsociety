import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("rZQbUGME2D4X6Re5D");

// Define FormData interface
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

// Prevents duplicate submissions
let isSubmitting = false;

// Export the validateFile function
export const validateFile = (file: File, isPassportPhoto: boolean): boolean => {
  const allowedExtensions = ["image/jpeg", "image/png", "application/pdf"];
  
  // Check if file type is allowed
  if (!allowedExtensions.includes(file.type)) {
    alert("Invalid file type. Only JPG, PNG, and PDF files are allowed.");
    return false;
  }

  // Check file size
  const maxSize = isPassportPhoto ? 171000 : 500000; // 171KB for passport photo, 500KB for other files
  if (file.size > maxSize) {
    alert(`File size must be less than ${maxSize / 1000}KB`);
    return false;
  }

  return true;
};

// Function to handle file upload with proper type checking
export const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof FormData) => {
  const file = e.target.files?.[0];
  if (file) {
    const isPassportPhoto = fileType === 'passportPhoto';
    
    // Validate file type and size
    if (!validateFile(file, isPassportPhoto)) {
      return null;
    }

    return file;
  }
  return null;
};

// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Update return type to Promise<boolean>
export const sendEmailWithAttachments = async (formData: FormData, files: { [key: string]: File }): Promise<boolean> => {
  if (isSubmitting) {
    console.log("Form already submitting...");
    return false;
  }

  isSubmitting = true;

  try {
    // Convert files to base64
    const fileAttachments: { [key: string]: string } = {};
    for (const [key, file] of Object.entries(files)) {
      if (file) {
        const compressedFile = file.type.startsWith('image/') 
          ? await compressImage(file)
          : file;
        fileAttachments[key] = await fileToBase64(compressedFile);
      }
    }

    // Split into chunks if needed
    const chunks = [];
    let currentChunk = {
      to_email: "bhemsociety@gmail.com",
      from_name: `${formData.firstName} ${formData.lastName}`,
      subject: `Job Application - ${formData.firstName} ${formData.lastName}`,
      message: generateEmailBody(formData),
      ...fileAttachments
    };

    // Send email with all details and attachments
    await emailjs.send(
      "service_frccd2d",
      "template_6z4229f",
      currentChunk
    );

    console.log("Application sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending application:", error);
    throw error;
  } finally {
    isSubmitting = false;
  }
};

const generateEmailBody = (data: FormData): string => {
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
`.trim();
};

const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

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
              reject(new Error("Could not compress image"));
              return;
            }
            resolve(new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            }));
          },
          "image/jpeg",
          0.7
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

export type { FormData };

