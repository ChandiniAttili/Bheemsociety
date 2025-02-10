// types/form.ts
export interface FormData {
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
  
  export const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    fatherName: '',
    dateOfBirth: '',
    gender: '',
    category: '',
    handicapped: 'no',
    adharnumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    position: '',
    experience: '',
    passportPhoto: null,
    tenthApplicable: 'yes',
    tenthBoard: '',
    tenthYear: '',
    tenthPercentage: '',
    tenthMemo: null,
    interApplicable: 'yes',
    interBoard: '',
    interYear: '',
    interPercentage: '',
    interMemo: null,
    diplomaApplicable: 'no',
    diplomaBoard: 'N/A',
    diplomaYear: 'N/A',
    diplomaPercentage: 'N/A',
    diplomaMemo: null,
    graduationApplicable: 'yes',
    graduationBoard: '',
    graduationYear: '',
    graduationPercentage: '',
    graduationMemo: null
  };