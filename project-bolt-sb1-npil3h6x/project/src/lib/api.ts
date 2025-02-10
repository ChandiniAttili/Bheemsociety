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
  
  // Convert file to base64
  export const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };
  
  // Generate printable version
  export const generatePrintableVersion = async (formData: any, files: { [key: string]: File }) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print the application');
      return;
    }
  
    let content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Job Application - ${formData.firstName} ${formData.lastName}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
          h1 { color: #1e40af; text-align: center; }
          .section { margin-bottom: 20px; }
          .section-title { color: #1e40af; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
          .field { margin: 10px 0; }
          .label { font-weight: bold; }
          img { max-width: 200px; margin: 10px 0; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Job Application Form</h1>
        
        <div class="section">
          <h2 class="section-title">Personal Information</h2>
          <div class="field"><span class="label">Name:</span> ${formData.firstName} ${formData.lastName}</div>
          <div class="field"><span class="label">Father's Name:</span> ${formData.fatherName}</div>
          <div class="field"><span class="label">Date of Birth:</span> ${formData.dateOfBirth}</div>
          <div class="field"><span class="label">Gender:</span> ${formData.gender}</div>
          <div class="field"><span class="label">Category:</span> ${formData.category}</div>
          <div class="field"><span class="label">Physically Handicapped:</span> ${formData.handicapped}</div>
          <div class="field"><span class="label">Aadhar Number:</span> ${formData.adharnumber}</div>
        </div>
  
        <div class="section">
          <h2 class="section-title">Contact Information</h2>
          <div class="field"><span class="label">Email:</span> ${formData.email}</div>
          <div class="field"><span class="label">Phone:</span> ${formData.phone}</div>
          <div class="field"><span class="label">Address:</span> ${formData.address}</div>
          <div class="field"><span class="label">City:</span> ${formData.city}</div>
          <div class="field"><span class="label">Pincode:</span> ${formData.pincode}</div>
        </div>
  
        <div class="section">
          <h2 class="section-title">Educational Information</h2>
    `;
  
    // Add education sections
    const educationSections = [
      { key: 'tenth', title: '10th Class' },
      { key: 'inter', title: 'Intermediate' },
      { key: 'diploma', title: 'Diploma' },
      { key: 'graduation', title: 'Graduation' }
    ];
  
    for (const section of educationSections) {
      if (formData[`${section.key}Applicable`] === 'yes') {
        content += `
          <div class="field">
            <h3>${section.title}</h3>
            <div><span class="label">Institution:</span> ${formData[`${section.key}Board`]}</div>
            <div><span class="label">Year:</span> ${formData[`${section.key}Year`]}</div>
            <div><span class="label">Percentage:</span> ${formData[`${section.key}Percentage`]}</div>
          </div>
        `;
      }
    }
  
    content += `
        </div>
  
        <div class="section">
          <h2 class="section-title">Professional Information</h2>
          <div class="field"><span class="label">Position Applied For:</span> ${formData.position}</div>
          <div class="field"><span class="label">Total Experience:</span> ${formData.experience} years</div>
        </div>
  
        <div class="section">
          <h2 class="section-title">Attachments</h2>
    `;
  
    // Add images/files
    for (const [key, file] of Object.entries(files)) {
      const base64Data = await fileToBase64(file);
      content += `
        <div class="field">
          <div class="label">${key === 'passportPhoto' ? 'Passport Photo' : key}:</div>
          <img src="${base64Data}" alt="${key}" />
        </div>
      `;
    }
  
    content += `
        </div>
  
        <button onclick="window.print()" style="margin: 20px 0; padding: 10px 20px; background: #1e40af; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Print Application
        </button>
      </body>
      </html>
    `;
  
    printWindow.document.write(content);
    printWindow.document.close();
  };
  
  // Send email with attachments
  export const sendEmailWithAttachments = async (formData: any, files: { [key: string]: File }) => {
    try {
      // Generate email body
      const emailBody = `
  Job Application Details
  
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
  • Total Experience: ${formData.experience} years
      `;
  
      // Create mailto link
      const subject = encodeURIComponent(`Job Application - ${formData.firstName} ${formData.lastName}`);
      const body = encodeURIComponent(emailBody);
      const mailtoLink = `mailto:bhemsociety@gmail.com?subject=${subject}&body=${body}`;
  
      // Open email client
      window.location.href = mailtoLink;
  
      // Generate printable version
      await generatePrintableVersion(formData, files);
  
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(ERROR_MESSAGES.EMAIL_FAILED);
    }
  };