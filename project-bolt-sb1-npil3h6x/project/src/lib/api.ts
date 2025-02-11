// File upload constraints
export const FILE_CONSTRAINTS = {
    PASSPORT_PHOTO_SIZE: 171 * 1024, // 171KB for passport photo
    DOCUMENT_SIZE: 500 * 1024, // 500KB for documents
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
  };
  
  // Error messages
  export const ERROR_MESSAGES = {
    PASSPORT_PHOTO_TOO_LARGE: 'Passport photo must be less than 171KB',
    DOCUMENT_TOO_LARGE: 'Documents must be less than 500KB each',
    INVALID_FILE_TYPE: 'Invalid file type. Please upload only JPG, PNG, or PDF files.',
    EMAIL_FAILED: 'Failed to send email. Please try again.',
  };
  
  // Validation functions
  export const validateFile = (file: File, isPassportPhoto: boolean = false): boolean => {
    if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
      alert(ERROR_MESSAGES.INVALID_FILE_TYPE);
      return false;
    }
    
    const maxSize = isPassportPhoto ? FILE_CONSTRAINTS.PASSPORT_PHOTO_SIZE : FILE_CONSTRAINTS.DOCUMENT_SIZE;
    if (file.size > maxSize) {
      alert(isPassportPhoto ? ERROR_MESSAGES.PASSPORT_PHOTO_TOO_LARGE : ERROR_MESSAGES.DOCUMENT_TOO_LARGE);
      return false;
    }
    
    return true;
  };
  
  // Send email with attachments
  export const sendEmailWithAttachments = async (formData: any, files: { [key: string]: File }) => {
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      emailjs.init("rZQbUGME2D4X6Re5D"); // Your actual public key
  
      // Convert files to base64
      const filePromises = Object.entries(files).map(async ([key, file]) => {
        return new Promise<[string, string]>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve([key, reader.result as string]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
  
      const fileAttachments = Object.fromEntries(await Promise.all(filePromises));
  
      // Prepare template data
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
  10th Details: ${formData.tenthApplicable === 'no' ? 'Not Applicable' : `
  • School: ${formData.tenthBoard}
  • Year: ${formData.tenthYear}
  • Percentage: ${formData.tenthPercentage}%`}
  
  Intermediate Details: ${formData.interApplicable === 'no' ? 'Not Applicable' : `
  • College: ${formData.interBoard}
  • Year: ${formData.interYear}
  • Percentage: ${formData.interPercentage}%`}
  
  Diploma Details: ${formData.diplomaApplicable === 'no' ? 'Not Applicable' : `
  • Board: ${formData.diplomaBoard}
  • Year: ${formData.diplomaYear}
  • Percentage: ${formData.diplomaPercentage}%`}
  
  Graduation Details: ${formData.graduationApplicable === 'no' ? 'Not Applicable' : `
  • University: ${formData.graduationBoard}
  • Year: ${formData.graduationYear}
  • Percentage: ${formData.graduationPercentage}%`}
  
  Professional Information:
  ----------------------
  • Position Applied For: ${formData.position}
  • Total Experience: ${formData.experience} years`,
        ...fileAttachments
      };
  
      // Send email using EmailJS
      const response = await emailjs.send(
        "service_frccd2d", // Your actual service ID
        "template_6z4229f", // Your actual template ID
        templateParams
      );
  
      if (response.status === 200) {
        return true;
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(ERROR_MESSAGES.EMAIL_FAILED);
    }
  };