import { init, send } from '@emailjs/browser';

// First, let's define our error types for better type safety
interface EmailJSError extends Error {
  status?: number;
  text?: string;
}

// Define our custom error class for better error handling
class ApplicationError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'ApplicationError';
  }
}

// File constraints remain the same
export const FILE_CONSTRAINTS = {
  PASSPORT_PHOTO_SIZE: 171 * 1024,
  DOCUMENT_SIZE: 500 * 1024,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
};

export const ERROR_MESSAGES = {
  PASSPORT_PHOTO_TOO_LARGE: 'Passport photo must be less than 171KB',
  DOCUMENT_TOO_LARGE: 'Documents must be less than 500KB each',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload only JPG, PNG, or PDF files.',
  EMAIL_FAILED: 'Failed to send email. Please try again.',
  CONFIG_MISSING: 'Email service configuration is missing. Please check your settings.',
  FILE_CONVERSION: 'Failed to process file attachments.',
};

// Enhanced file validation with proper error handling
export const validateFile = (file: File, isPassportPhoto: boolean = false): boolean => {
  try {
    if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
      console.error(`Invalid file type: ${file.type}`);
      alert(ERROR_MESSAGES.INVALID_FILE_TYPE);
      return false;
    }
    
    const maxSize = isPassportPhoto ? FILE_CONSTRAINTS.PASSPORT_PHOTO_SIZE : FILE_CONSTRAINTS.DOCUMENT_SIZE;
    if (file.size > maxSize) {
      console.error(`File too large: ${file.size} bytes`);
      alert(isPassportPhoto ? ERROR_MESSAGES.PASSPORT_PHOTO_TOO_LARGE : ERROR_MESSAGES.DOCUMENT_TOO_LARGE);
      return false;
    }
    
    return true;
  } catch (err) {
    // Properly handle unknown error type
    const error = err as Error;
    console.error('File validation error:', error.message);
    return false;
  }
};

// Enhanced email sender with proper TypeScript error handling
export const sendEmailWithAttachments = async (formData: any, files: { [key: string]: File }) => {
  try {
    // Step 1: Validate environment variables
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    console.log('Checking EmailJS configuration...');
    if (!publicKey || !serviceId || !templateId) {
      const missingConfig = {
        hasPublicKey: !!publicKey,
        hasServiceId: !!serviceId,
        hasTemplateId: !!templateId
      };
      console.error('Missing configuration:', missingConfig);
      throw new ApplicationError(ERROR_MESSAGES.CONFIG_MISSING);
    }

    // Step 2: Initialize EmailJS
    console.log('Initializing EmailJS...');
    init(publicKey);

    // Step 3: Process file attachments
    console.log('Processing file attachments...');
    const filePromises = Object.entries(files).map(async ([key, file]) => {
      return new Promise<[string, string]>((resolve, reject) => {
        if (!file) {
          reject(new ApplicationError(`Missing file: ${key}`));
          return;
        }

        console.log(`Converting file: ${key} (${file.size} bytes)`);
        const reader = new FileReader();
        
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            console.log(`Successfully converted ${key}`);
            resolve([key, reader.result]);
          } else {
            reject(new ApplicationError(`Invalid conversion result for ${key}`));
          }
        };
        
        reader.onerror = (event) => {
          console.error(`Error reading ${key}:`, event);
          reject(new ApplicationError(`Failed to read ${key}`, event));
        };
        
        reader.readAsDataURL(file);
      });
    });

    console.log(`Converting ${filePromises.length} files...`);
    const fileAttachments = Object.fromEntries(await Promise.all(filePromises));
    console.log('File conversion complete');

    // Step 4: Prepare email template parameters
    console.log('Preparing email content...');
    const templateParams = {
      to_name: "Bheem Society",
      to_email: "bhemsociety@gmail.com",
      from_name: `${formData.firstName} ${formData.lastName}`,
      subject: `Job Application - ${formData.firstName} ${formData.lastName}`,
      message: `
Personal Information:
-------------------
• Name: ${formData.firstName} ${formData.lastName}
• Father's Name: ${formData.fatherName}
• Date of Birth: ${formData.dateOfBirth}
• Gender: ${formData.gender}
• Category: ${formData.category}
• Physically Handicapped: ${formData.handicapped}
• Aadhar Number: ${formData.adharnumber}

Contact Information:
------------------
• Email: ${formData.email}
• Phone: ${formData.phone}
• Address: ${formData.address}
• City: ${formData.city}
• Pincode: ${formData.pincode}

Educational Information:
---------------------
${Object.entries({
  'tenth': '10th',
  'inter': 'Intermediate',
  'diploma': 'Diploma',
  'graduation': 'Graduation'
}).map(([key, label]) => `
${label} Details: ${formData[`${key}Applicable`] === 'no' ? 'Not Applicable' : `
• Institution: ${formData[`${key}Board`]}
• Year: ${formData[`${key}Year`]}
• Percentage: ${formData[`${key}Percentage`]}%`}`).join('\n')}

Professional Information:
----------------------
• Position Applied For: ${formData.position}
• Total Experience: ${formData.experience} years`,
      ...fileAttachments
    };

    // Step 5: Send email
    console.log('Sending email...');
    const response = await send(
      serviceId,
      templateId,
      templateParams
    );

    // Step 6: Handle response
    console.log('Email response:', response);
    if (response.status === 200) {
      console.log('Email sent successfully');
      return true;
    } else {
      throw new ApplicationError(`Email send failed with status: ${response.status}`);
    }
  } catch (err) {
    // Properly handle unknown error type
    const error = err as Error;
    
    // Detailed error logging with type safety
    console.error('Email send error:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error instanceof ApplicationError ? error.cause : undefined
    });
    
    // Determine the appropriate error message
    if (error.message.includes('configuration')) {
      throw new ApplicationError(ERROR_MESSAGES.CONFIG_MISSING);
    } else if (error.message.includes('file')) {
      throw new ApplicationError(ERROR_MESSAGES.FILE_CONVERSION);
    } else {
      throw new ApplicationError(ERROR_MESSAGES.EMAIL_FAILED, error);
    }
  }
};