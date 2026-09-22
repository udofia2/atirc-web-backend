import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Contact } from '../entities';
import { sendContactEmail } from '../services/email.service';

const contactRepository = AppDataSource.getRepository(Contact);

export const createContact = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, message } = req.body;

    const contact = contactRepository.create({
      firstname,
      lastname,
      email,
      message
    });

    await contactRepository.save(contact);

    sendContactEmail({ firstname, lastname, email, message }).catch(err => {
      console.error('Email notification failed (non-blocking):', err?.message || err);
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form'
    });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await contactRepository.find({
      order: { created_at: 'DESC' }
    });

    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
};

export const getContactById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await contactRepository.findOneBy({ id });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    });
  }
};
