import emailjs from '@emailjs/browser';

export const sendEmailWithAttachments = async (
  formData: {
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
    tenthBoard: string;
    tenthYear: string;
    tenthPercentage: string;
    interBoard: string;
    interYear: string;
    interPercentage: string;
    diplomaBoard: string;
    diplomaYear: string;
    diplomaPercentage: string;
    graduationBoard: string;
    graduationYear: string;
    graduationPercentage: string;
    position: string;
    experience: string;
  },
  fileAttachments: { name: string; data: string }[]
): Promise<emailjs.EmailJSResponseStatus> => {
  const templateParams = {
    to_email: 'bhemsociety@gmail.com',
    from_name: `${formData.firstName} ${formData.lastName}`,
    from_email: formData.email,
    subject: `Job Application - ${formData.firstName} ${formData.lastName}`,
    message: `
Personal Information:
-------------------
Name: ${formData.firstName} ${formData.lastName}
Father's Name: ${formData.fatherName}
Date of Birth: ${formData.dateOfBirth}
Gender: ${formData.gender}
Category: ${formData.category}
Physically Handicapped: ${formData.handicapped}
Adhar Number: ${formData.adharnumber}

Contact Information:
-------------------
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
City: ${formData.city}
Pincode: ${formData.pincode}

Educational Information:
---------------------
10th Details:
School: ${formData.tenthBoard}
Year: ${formData.tenthYear}
Percentage: ${formData.tenthPercentage}

Intermediate Details:
College: ${formData.interBoard}
Year: ${formData.interYear}
Percentage: ${formData.interPercentage}

Diploma Details:
Board: ${formData.diplomaBoard}
Year: ${formData.diplomaYear}
Percentage: ${formData.diplomaPercentage}

Graduation Details:
University: ${formData.graduationBoard}
Year: ${formData.graduationYear}
Percentage: ${formData.graduationPercentage}

Professional Information:
----------------------
Position Applied For: ${formData.position}
Total Experience: ${formData.experience} years
    `,
    attachments: fileAttachments,
  };

  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
