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
  const allowedExtensions = ["image/jpeg", "image/png"];
  
  // Check if file type is allowed
  if (!allowedExtensions.includes(file.type)) {
    console.error("Invalid file type");
    return false;
  }

  // Check if the file is a passport photo and if it exceeds the size limit
  if (isPassportPhoto && file.size > 1000000) { // Example: 1MB size limit for passport photo
    console.error("Passport photo is too large");
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
      return;
    }

    // Handle further logic for successful validation
    console.log("File is valid", file);
  }
};

// Update return type to Promise<boolean>
export const sendEmailWithAttachments = async (formData: FormData, files: { [key: string]: File }): Promise<boolean> => {
  if (isSubmitting) {
    console.log("Form already submitting...");
    return false;
  }

  isSubmitting = true;

  try {
    const emailBody = generateEmailBody(formData);

    const compressedFiles: Record<string, File> = {};
    for (const [key, file] of Object.entries(files)) {
      if (file.type.startsWith('image/')) {
        compressedFiles[key] = await compressImage(file);
      } else {
        compressedFiles[key] = file;
      }
    }

    await emailjs.send("service_frccd2d", "template_6z4229f", {
      to_email: "bhemsociety@gmail.com",
      from_name: `${formData.firstName} ${formData.lastName}`,
      subject: `Job Application - ${formData.firstName} ${formData.lastName}`,
      message: emailBody,
      attachments: compressedFiles,
    });

    console.log("Application sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending application:", error);
    return false;
  } finally {
    isSubmitting = false;
  }
};

// Updated to use FormData type
const generateEmailBody = (data: FormData): string => {
  return `
  Job Application Details:

  Personal Information:
  -------------------
  Name: ${data.firstName || "Not Provided"} ${data.lastName || ""}
  Father's Name: ${data.fatherName || "Not Provided"}
  Date of Birth: ${data.dateOfBirth || "Not Provided"}
  Gender: ${data.gender || "Not Provided"}
  Category: ${data.category || "Not Provided"}
  Physically Handicapped: ${data.handicapped || "Not Provided"}
  Aadhar Number: ${data.adharnumber || "Not Provided"}

  Contact Information:
  ------------------
  Email: ${data.email || "Not Provided"}
  Phone: ${data.phone || "Not Provided"}
  Address: ${data.address || "Not Provided"}
  City: ${data.city || "Not Provided"}
  Pincode: ${data.pincode || "Not Provided"}

  Educational Information:
  ---------------------
  10th Details:
  ${data.tenthBoard ? `Board: ${data.tenthBoard}, Year: ${data.tenthYear}, Percentage: ${data.tenthPercentage}` : "Not Provided"}

  Intermediate Details:
  ${data.interBoard ? `Board: ${data.interBoard}, Year: ${data.interYear}, Percentage: ${data.interPercentage}` : "Not Provided"}

  Diploma Details:
  ${data.diplomaBoard ? `Institution: ${data.diplomaBoard}, Year: ${data.diplomaYear}, Percentage: ${data.diplomaPercentage}` : "Not Provided"}

  Graduation Details:
  ${data.graduationBoard ? `University: ${data.graduationBoard}, Year: ${data.graduationYear}, Percentage: ${data.graduationPercentage}` : "Not Provided"}

  Professional Information:
  ----------------------
  Position Applied For: ${data.position || "Not Provided"}
  Total Experience: ${data.experience || "Not Provided"} years
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

