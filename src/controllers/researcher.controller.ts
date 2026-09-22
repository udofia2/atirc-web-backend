import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Researcher } from '../entities';
import { sendApplicationEmail } from '../services/email.service';

const researcherRepository = AppDataSource.getRepository(Researcher);

export const createResearcher = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      institution,
      designation,
      researchArea,
      academicQualification,
      researchAbstract,
      biography,
      headshot,
      cv,
      researchProposal
    } = req.body;

    const researcher = researcherRepository.create({
      firstName,
      lastName,
      email,
      phone,
      institution,
      designation,
      researchArea,
      academicQualification,
      researchAbstract,
      biography,
      headshot,
      cv,
      researchProposal
    });

    await researcherRepository.save(researcher);

    sendApplicationEmail({
      type: 'research',
      data: { firstName, lastName, email, phone }
    }).catch(err => {
      console.error('Email notification failed (non-blocking):', err?.message || err);
    });

    res.status(201).json({
      success: true,
      data: researcher,
      message: 'Researcher application submitted successfully'
    });
  } catch (error) {
    console.error('Error creating researcher:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit researcher application'
    });
  }
};

export const getResearchers = async (req: Request, res: Response) => {
  try {
    const { search, researchArea, academicQualification } = req.query;

    let queryBuilder = researcherRepository.createQueryBuilder('researcher')
      .where('researcher.status = :status', { status: 'active' });

    if (researchArea && researchArea !== 'all') {
      queryBuilder = queryBuilder.andWhere('researcher.researchArea = :researchArea', {
        researchArea
      });
    }

    if (academicQualification && academicQualification !== 'all') {
      queryBuilder = queryBuilder.andWhere('researcher.academicQualification = :academicQualification', {
        academicQualification
      });
    }

    if (search) {
      queryBuilder = queryBuilder.andWhere(
        `(CONCAT(researcher.firstName, ' ', researcher.lastName) LIKE :search 
          OR researcher.institution LIKE :search 
          OR researcher.researchArea LIKE :search)`,
        { search: `%${search}%` }
      );
    }

    const researchers = await queryBuilder
      .orderBy('researcher.createdAt', 'DESC')
      .getMany();

    res.status(200).json({
      success: true,
      data: researchers
    });
  } catch (error) {
    console.error('Error fetching researchers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch researchers'
    });
  }
};

export const getResearcherById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const researcher = await researcherRepository.findOneBy({ id });

    if (!researcher) {
      return res.status(404).json({
        success: false,
        message: 'Researcher not found'
      });
    }

    res.status(200).json({
      success: true,
      data: researcher
    });
  } catch (error) {
    console.error('Error fetching researcher:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch researcher'
    });
  }
};
