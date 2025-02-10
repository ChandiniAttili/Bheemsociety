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
  
  // Show error message in the UI
  const showErrorMessage = (message: string): void => {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  };
  
  // Validation functions
  export const validateFile = (file: File, isPassportPhoto: boolean = false): boolean => {
    if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
      showErrorMessage(ERROR_MESSAGES.INVALID_FILE_TYPE);
      return false;
    }
  
    const maxSize = isPassportPhoto ? FILE_CONSTRAINTS.PASSPORT_PHOTO_SIZE : FILE_CONSTRAINTS.DOCUMENT_SIZE;
    if (file.size > maxSize) {
      showErrorMessage(isPassportPhoto ? ERROR_MESSAGES.PASSPORT_PHOTO_TOO_LARGE : ERROR_MESSAGES.DOCUMENT_TOO_LARGE);
      return false;
    }
  
    return true;
  };
  
  // Convert file to base64
  export const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };
  
  // Validate form data before sending the email
  export const validateFormData = (formData: any): boolean => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'position', 
      'adharnumber', 'address', 'city', 'pincode'
    ];
  
    for (const field of requiredFields) {
      if (!formData[field]) {
        showErrorMessage(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
  
    return true;
  };
  
  // Send email with attachments
  export const sendEmailWithAttachments = async (formData: any, files: { [key: string]: File }) => {
    try {
      // Validate form data first
      if (!validateFormData(formData)) return false;
  
      const emailjs = (await import('@emailjs/browser')).default;
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
  
      // Convert files to base64
      const fileAttachments: { [key: string]: string } = {};
      for (const [key, file] of Object.entries(files)) {
        if (!validateFile(file)) return false; // Check each file before converting
        fileAttachments[key] = await fileToBase64(file);
      }
  
      // Prepare template data
      const templateParams = {
        to_email: 'bhemsociety@gmail.com',
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
      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        templateParams
      );
  
      // Success message can be displayed here
      const successMessageElement = document.getElementById('success-message');
      if (successMessageElement) {
        successMessageElement.textContent = 'Your application has been successfully submitted!';
        successMessageElement.style.display = 'block';
      }
  
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      showErrorMessage(ERROR_MESSAGES.EMAIL_FAILED);
      return false;
    }
  };
  