import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrls: (process.env.FRONTEND_URLS || 'http://localhost:5173')
    .split(',')
    .map((url) => url.trim()),
  email: {
    serviceId: process.env.EMAIL_SERVICE_ID || '',
    contactTemplate: process.env.EMAIL_CONTACT_TEMPLATE || '',
    jobTemplate: process.env.EMAIL_JOB_TEMPLATE || '',
    publicKey: process.env.EMAIL_PUBLIC_KEY || ''
  }
};
