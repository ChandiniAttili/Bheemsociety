declare module '@emailjs/browser' {
    export type EmailJSResponseStatus = {
      status: number;
      text: string;
    };
  
    export const send: (
      serviceId: string,
      templateId: string,
      templateParams: Record<string, any>,
      publicKey: string
    ) => Promise<EmailJSResponseStatus>;
  
    export const init: (userId: string) => void;
  }
  