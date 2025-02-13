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
  
  if (!allowedExtensions.includes(file.type)) {
    alert("Invalid file type. Only JPG, PNG, and PDF files are allowed.");
    return false;
  }

  const maxSize = isPassportPhoto ? 171000 : 500000;
  if (file.size > maxSize) {
    alert(`File size must be less than ${maxSize / 1000}KB`);
    return false;
  }

  return true;
};

export const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof FormData) => {
  const file = e.target.files?.[0];
  if (file) {
    const isPassportPhoto = fileType === 'passportPhoto';
    if (!validateFile(file, isPassportPhoto)) {
      return null;
    }
    return file;
  }
  return null;
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const sendEmailWithAttachments = async (formData: FormData, files: { [key: string]: File }): Promise<boolean> => {
  if (isSubmitting) {
    console.log("Form already submitting...");
    return false;
  }

  isSubmitting = true;

  try {
    const fileAttachments: { [key: string]: string } = {};
    for (const [key, file] of Object.entries(files)) {
      if (file) {
        const compressedFile = file.type.startsWith('image/') 
          ? await compressImage(file)
          : file;
        fileAttachments[key] = await fileToBase64(compressedFile);
      }
    }

    const payload = {
      to: "bhemsociety@gmail.com",
      from: formData.email,
      subject: `Job Application - ${formData.firstName} ${formData.lastName}`,
      body: generateEmailBody(formData),
      attachments: fileAttachments
    };

    await fetch("https://mailapis-3v2b.onrender.com/api/v1/mail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

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
  return `Job Application Details:\n\nPersonal Information:\n-------------------\nName: ${data.firstName} ${data.lastName}\nFather's Name: ${data.fatherName}\nDate of Birth: ${data.dateOfBirth}\nGender: ${data.gender}\nCategory: ${data.category}\nPhysically Handicapped: ${data.handicapped}\nAadhar Number: ${data.adharnumber}\n\nContact Information:\n------------------\nEmail: ${data.email}\nPhone: ${data.phone}\nAddress: ${data.address}\nCity: ${data.city}\nPincode: ${data.pincode}\n\nProfessional Information:\n----------------------\nPosition Applied For: ${data.position}\nTotal Experience: ${data.experience} years\n`;
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
