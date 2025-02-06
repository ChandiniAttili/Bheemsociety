export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };
  
  export const validateBookingForm = (data: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  }): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};
  
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }
  
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }
  
    if (!data.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(data.phone)) {
      errors.phone = 'Invalid phone number format';
    }
  
    if (!data.service) {
      errors.service = 'Please select a service';
    }
  
    if (!data.message.trim()) {
      errors.message = 'Message is required';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };