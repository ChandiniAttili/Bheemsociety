export const EMAIL_CONFIG = {
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  TO_EMAIL: 'bhemsociety@gmail.com'
} as const;
