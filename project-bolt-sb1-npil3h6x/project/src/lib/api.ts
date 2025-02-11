import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("rZQbUGME2D4X6Re5D");

// Function to validate files before upload
export const validateFile = (file: File, isPassportPhoto: boolean = false): boolean => {
  const allowedFormats = ['image/jpeg', 'image/png', 'application/pdf'];
  const maxSize = isPassportPhoto ? 171000 : 500000;

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

// Function to send email
export const sendEmailWithAttachments = async (formData: any, files: { [key: string]: File }) => {
  try {
    if (!formData) {
      console.error("❌ formData is missing or undefined.");
      return;
    }

    // Ensure all fields are defined to prevent missing values
    const emailContent = generateEmailBody(formData);

    if (!emailContent.trim()) {
      console.error("❌ Email content is empty.");
      return;
    }

    // Convert files to Base64
    const attachments: { name: string; data: string }[] = [];
    for (const file of Object.values(files)) {
      const base64 = await fileToBase64(file);
      attachments.push({ name: file.name, data: base64 });
    }

    // Construct email data
    const emailData = {
      to_email: 'bheemsociety@gmail.com',
      from_name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
      subject: `Job Application - ${formData.firstName || 'Unknown'} ${formData.lastName || ''}`,
      message: emailContent,
      attachments
    };

    // Send email via EmailJS
    await emailjs.send("service_frccd2d", "template_6z4229f", emailData);

    console.log("✅ Email sent successfully.");
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

// Convert file to Base64 format
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

// Generate email body with job application details
const generateEmailBody = (data: any): string => {
  return `
  <h2>📩 Job Application Details</h2>

  <h3>👤 Personal Information</h3>
  <p><strong>Name:</strong> ${data.firstName || ''} ${data.lastName || ''}</p>
  <p><strong>Father's Name:</strong> ${data.fatherName || 'N/A'}</p>
  <p><strong>Date of Birth:</strong> ${data.dateOfBirth || 'N/A'}</p>
  <p><strong>Gender:</strong> ${data.gender || 'N/A'}</p>
  <p><strong>Category:</strong> ${data.category || 'N/A'}</p>
  <p><strong>Physically Handicapped:</strong> ${data.handicapped || 'N/A'}</p>
  <p><strong>Aadhar Number:</strong> ${data.adharnumber || 'N/A'}</p>

  <h3>📞 Contact Information</h3>
  <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
  <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
  <p><strong>Address:</strong> ${data.address || 'N/A'}, ${data.city || 'N/A'}, ${data.pincode || 'N/A'}</p>

  <h3>🎓 Educational Information</h3>
  ${data.tenthApplicable === 'yes' ? `
  <h4>10th Details</h4>
  <p><strong>School:</strong> ${data.tenthBoard || 'N/A'}</p>
  <p><strong>Year:</strong> ${data.tenthYear || 'N/A'}</p>
  <p><strong>Percentage:</strong> ${data.tenthPercentage || 'N/A'}%</p>` : '<p>10th Details: Not Applicable</p>'}

  ${data.interApplicable === 'yes' ? `
  <h4>Intermediate Details</h4>
  <p><strong>College:</strong> ${data.interBoard || 'N/A'}</p>
  <p><strong>Year:</strong> ${data.interYear || 'N/A'}</p>
  <p><strong>Percentage:</strong> ${data.interPercentage || 'N/A'}%</p>` : '<p>Intermediate Details: Not Applicable</p>'}

  ${data.diplomaApplicable === 'yes' ? `
  <h4>Diploma Details</h4>
  <p><strong>Institution:</strong> ${data.diplomaBoard || 'N/A'}</p>
  <p><strong>Year:</strong> ${data.diplomaYear || 'N/A'}</p>
  <p><strong>Percentage:</strong> ${data.diplomaPercentage || 'N/A'}%</p>` : '<p>Diploma Details: Not Applicable</p>'}

  ${data.graduationApplicable === 'yes' ? `
  <h4>Graduation Details</h4>
  <p><strong>University:</strong> ${data.graduationBoard || 'N/A'}</p>
  <p><strong>Year:</strong> ${data.graduationYear || 'N/A'}</p>
  <p><strong>Percentage:</strong> ${data.graduationPercentage || 'N/A'}%</p>` : '<p>Graduation Details: Not Applicable</p>'}

  <h3>💼 Professional Information</h3>
  <p><strong>Position Applied For:</strong> ${data.position || 'N/A'}</p>
  <p><strong>Total Experience:</strong> ${data.experience || 'N/A'} years</p>

  <p style="margin-top: 20px; font-size: 14px; color: #888;">
    Sent via Bheem Society Job Portal
  </p>
  `;
};
