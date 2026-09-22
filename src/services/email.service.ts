import axios from 'axios';
import { config } from '../config/env';

interface ContactEmailData {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
}

interface ApplicationEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobPosition?: string;
}

export const sendContactEmail = async (data: ContactEmailData): Promise<void> => {
  try {
    const payload = {
      service_id: config.email.serviceId,
      template_id: config.email.contactTemplate,
      user_id: config.email.publicKey,
      template_params: {
        to_name: 'ATIRC Team',
        from_name: `${data.firstname} ${data.lastname}`,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        message: data.message
      }
    };

    await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload);
    console.log('Contact email sent successfully');
  } catch (error) {
    console.error('Failed to send contact email:', error);
    throw error;
  }
};

export const sendApplicationEmail = async (params: {
  type: 'research' | 'incubation' | 'job';
  data: ApplicationEmailData;
}): Promise<void> => {
  try {
    const { type, data } = params;

    const payload = {
      service_id: config.email.serviceId,
      template_id: config.email.jobTemplate,
      user_id: config.email.publicKey,
      template_params: {
        to_name: 'ATIRC Team',
        from_name: `${data.firstName} ${data.lastName}`,
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phonenumber: data.phone,
        title: type === 'job' 
          ? `Job Application - ${data.jobPosition}` 
          : `${type.charAt(0).toUpperCase() + type.slice(1)} Application`
      }
    };

    await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload);
    console.log(`${type} application email sent successfully`);
  } catch (error) {
    console.error('Failed to send application email:', error);
    throw error;
  }
};
