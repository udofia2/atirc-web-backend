import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Incubantee } from '../entities';
import { sendApplicationEmail } from '../services/email.service';

const incubanteeRepository = AppDataSource.getRepository(Incubantee);

export const createIncubantee = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      incubationCategory,
      startupProduct,
      designation,
      researchInterests,
      biography,
      headshot,
      pitchDeck
    } = req.body;

    const incubantee = incubanteeRepository.create({
      firstName,
      lastName,
      email,
      phone,
      incubationCategory,
      startupProduct,
      designation,
      researchInterests,
      biography,
      headshot,
      pitchDeck
    });

    await incubanteeRepository.save(incubantee);

    sendApplicationEmail({
      type: 'incubation',
      data: { firstName, lastName, email, phone }
    }).catch(err => {
      console.error('Email notification failed (non-blocking):', err?.message || err);
    });

    res.status(201).json({
      success: true,
      data: incubantee,
      message: 'Incubation application submitted successfully'
    });
  } catch (error) {
    console.error('Error creating incubantee:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit incubation application'
    });
  }
};

export const getIncubantees = async (req: Request, res: Response) => {
  try {
    const { search, incubationCategory } = req.query;

    let queryBuilder = incubanteeRepository.createQueryBuilder('incubantee')
      .where('incubantee.status = :status', { status: 'active' });

    if (incubationCategory && incubationCategory !== 'all') {
      queryBuilder = queryBuilder.andWhere('incubantee.incubationCategory = :incubationCategory', {
        incubationCategory
      });
    }

    if (search) {
      queryBuilder = queryBuilder.andWhere(
        `(CONCAT(incubantee.firstName, ' ', incubantee.lastName) LIKE :search 
          OR incubantee.startupProduct LIKE :search 
          OR incubantee.designation LIKE :search
          OR incubantee.incubationCategory LIKE :search)`,
        { search: `%${search}%` }
      );
    }

    const incubantees = await queryBuilder
      .orderBy('incubantee.createdAt', 'DESC')
      .getMany();

    res.status(200).json({
      success: true,
      data: incubantees
    });
  } catch (error) {
    console.error('Error fetching incubantees:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch incubantees'
    });
  }
};

export const getIncubanteeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const incubantee = await incubanteeRepository.findOneBy({ id });

    if (!incubantee) {
      return res.status(404).json({
        success: false,
        message: 'Incubantee not found'
      });
    }

    res.status(200).json({
      success: true,
      data: incubantee
    });
  } catch (error) {
    console.error('Error fetching incubantee:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch incubantee'
    });
  }
};
