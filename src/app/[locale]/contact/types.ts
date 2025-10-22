// src/app/[locale]/contact/types.ts
export type FormDict = {
  labels: { name: string; email: string; message: string };
  placeholders: { name: string; email: string; message: string };
  buttons: { send: string; sending: string; sent: string; retry: string };
  alerts: { success: string; errorGeneric: string; errorNetwork: string };
  a11y: { statusSending: string; statusSuccess: string; statusError: string };
  validation: {
    name: { min: string; max: string };
    fromEmail: { email: string };
    message: { min: string; max: string };
    consent: { required: string };
  };
};
