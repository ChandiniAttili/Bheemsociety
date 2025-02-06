// Email configuration
export const EMAIL_CONFIG = {
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    TO_EMAIL: 'bhemsociety@gmail.com'
  } as const;