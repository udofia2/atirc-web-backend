import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Resource } from '../entities';

const resourceRepository = AppDataSource.getRepository(Resource);

export const getResources = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;

    let queryBuilder = resourceRepository.createQueryBuilder('resource')
      .where('resource.status = :status', { status: 'active' });

    if (category && category !== 'all') {
      queryBuilder = queryBuilder.andWhere('resource.category = :category', {
        category
      });
    }

    if (search) {
      queryBuilder = queryBuilder.andWhere(
        `(resource.title LIKE :search OR resource.description LIKE :search)`,
        { search: `%${search}%` }
      );
    }

    const resources = await queryBuilder
      .orderBy('resource.created_at', 'DESC')
      .getMany();

    res.status(200).json({
      success: true,
      data: resources
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resources'
    });
  }
};

export const getResourceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resource = await resourceRepository.findOneBy({ id });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    console.error('Error fetching resource:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resource'
    });
  }
};

export const trackDownload = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resource = await resourceRepository.findOneBy({ id });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    resource.downloadCount += 1;
    await resourceRepository.save(resource);

    res.status(200).json({
      success: true,
      data: { fileUrl: resource.fileUrl },
      message: 'Download tracked'
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track download'
    });
  }
};

export const createResource = async (req: Request, res: Response) => {
  try {
    const { title, description, category, fileUrl, fileType, fileSize, coverImage } = req.body;

    const resource = resourceRepository.create({
      title,
      description,
      category,
      fileUrl,
      fileType,
      fileSize,
      coverImage
    });

    await resourceRepository.save(resource);

    res.status(201).json({
      success: true,
      data: resource,
      message: 'Resource created successfully'
    });
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create resource'
    });
  }
};
