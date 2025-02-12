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
  tenthApplicable: string;
  tenthBoard: string;
  tenthYear: string;
  tenthPercentage: string;
  interApplicable: string;
  interBoard: string;
  interYear: string;
  interPercentage: string;
  diplomaApplicable: string;
  diplomaBoard: string;
  diplomaYear: string;
  diplomaPercentage: string;
  graduationApplicable: string;
  graduationBoard: string;
  graduationYear: string;
  graduationPercentage: string;
}

export const sendEmailWithAttachments = async (formData: FormData): Promise<boolean> => {
  try {
    const subject = encodeURIComponent(`Job Application - ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(generateEmailBody(formData));
    const mailtoLink = `mailto:bhemsociety@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    return true;
  } catch (error) {
    console.error("Error opening email client:", error);
    return false;
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

export type { FormData };