import { send, init } from '@emailjs/browser';

// Load environment variables
const publicKey = process.env.EMAILJS_PUBLIC_KEY || '';
const serviceId = process.env.EMAILJS_SERVICE_ID || '';
const templateId = process.env.EMAILJS_TEMPLATE_ID || '';

// Initialize EmailJS with the publicKey
init(publicKey);

export const sendEmail = async (templateParams: Record<string, any>) => {
  try {
    const response = await send(serviceId, templateId, templateParams, publicKey);
    console.log('✅ Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};
