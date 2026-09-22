import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { JobApplication } from '../entities';
import { sendApplicationEmail } from '../services/email.service';

const jobApplicationRepository = AppDataSource.getRepository(JobApplication);

export const createJobApplication = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      jobPosition,
      resume,
      applicationLetter
    } = req.body;

    const jobApplication = jobApplicationRepository.create({
      firstName,
      lastName,
      email,
      phone,
      jobPosition,
      resume,
      applicationLetter
    });

    await jobApplicationRepository.save(jobApplication);

    sendApplicationEmail({
      type: 'job',
      data: { firstName, lastName, email, phone, jobPosition }
    }).catch(err => {
      console.error('Email notification failed (non-blocking):', err?.message || err);
    });

    res.status(201).json({
      success: true,
      data: jobApplication,
      message: 'Job application submitted successfully'
    });
  } catch (error) {
    console.error('Error creating job application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit job application'
    });
  }
};

export const getJobApplications = async (req: Request, res: Response) => {
  try {
    const jobApplications = await jobApplicationRepository.find({
      order: { createdAt: 'DESC' }
    });

    res.status(200).json({
      success: true,
      data: jobApplications
    });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job applications'
    });
  }
};

export const getJobApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobApplication = await jobApplicationRepository.findOneBy({ id });

    if (!jobApplication) {
      return res.status(404).json({
        success: false,
        message: 'Job application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: jobApplication
    });
  } catch (error) {
    console.error('Error fetching job application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job application'
    });
  }
};
