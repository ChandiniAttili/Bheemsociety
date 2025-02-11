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

        // Maintain aspect ratio
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

// EmailChunk interface with index signature
interface EmailChunk {
  to_email: string;
  from_name: string;
  subject: string;
  message: string;
  image_url?: string;
  files: Record<string, File>;
  [key: string]: unknown;  // <-- Fix: Added index signature
}

// Email sending function
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

    let currentSize = 0;
    const maxSize = 45000; // Keep below 50KB limit with some buffer

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
        currentSize = 0;
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
        chunk as Record<string, unknown>  // <-- Fix: Ensure proper type
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
<h2 style="color: #007bff;">📩 Job Application</h2>

<p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
<p><strong>Father's Name:</strong> ${data.fatherName}</p>
<p><strong>Date of Birth:</strong> ${data.dateOfBirth}</p>
<p><strong>Gender:</strong> ${data.gender}</p>
<p><strong>Category:</strong> ${data.category}</p>
<p><strong>Physically Handicapped:</strong> ${data.handicapped}</p>
<p><strong>Aadhar Number:</strong> ${data.adharnumber}</p>

<h3>📞 Contact Information</h3>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Address:</strong> ${data.address}, ${data.city}, ${data.pincode}</p>

<h3>🎓 Educational Information</h3>

${data.tenthApplicable === 'yes' ? `
<h4>10th Details</h4>
<p><strong>School:</strong> ${data.tenthBoard}</p>
<p><strong>Year:</strong> ${data.tenthYear}</p>
<p><strong>Percentage:</strong> ${data.tenthPercentage}</p>` : ''}

${data.interApplicable === 'yes' ? `
<h4>Intermediate Details</h4>
<p><strong>College:</strong> ${data.interBoard}</p>
<p><strong>Year:</strong> ${data.interYear}</p>
<p><strong>Percentage:</strong> ${data.interPercentage}</p>` : ''}

${data.diplomaApplicable === 'yes' ? `
<h4>Diploma Details</h4>
<p><strong>Institution:</strong> ${data.diplomaBoard}</p>
<p><strong>Year:</strong> ${data.diplomaYear}</p>
<p><strong>Percentage:</strong> ${data.diplomaPercentage}</p>` : ''}

${data.graduationApplicable === 'yes' ? `
<h4>Graduation Details</h4>
<p><strong>University:</strong> ${data.graduationBoard}</p>
<p><strong>Year:</strong> ${data.graduationYear}</p>
<p><strong>Percentage:</strong> ${data.graduationPercentage}</p>` : ''}

<h3>💼 Professional Information</h3>
<p><strong>Position Applied For:</strong> ${data.position}</p>
<p><strong>Total Experience:</strong> ${data.experience} years</p>

<p style="margin-top: 20px; font-size: 14px; color: #888;">
  Sent via Bheem Society Job Portal
</p>
`;
};
