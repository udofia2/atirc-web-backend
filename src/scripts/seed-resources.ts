import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { AppDataSource } from '../config/database';
import { Resource } from '../entities';

dotenv.config();

const seedResources = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const repository = AppDataSource.getRepository(Resource);

    const existing = await repository.count();
    if (existing > 0) {
      console.log(`Resources already seeded (${existing} rows). Skipping.`);
      await AppDataSource.destroy();
      return;
    }

    const samples = [
      {
        title: 'ATIRC Research Methodology Handbook',
        description: 'A comprehensive guide to research methodology for ATIRC researchers and students, covering proposal writing, ethics, and publication standards.',
        category: 'Research',
        fileUrl: 'https://res.cloudinary.com/atirc/raw/upload/fl_attachment/uploads/resources/research-methodology-handbook.pdf',
        fileType: 'PDF',
        fileSize: '2.4 MB',
        coverImage: ''
      },
      {
        title: 'Full Stack Development Curriculum',
        description: 'Complete curriculum outline for the ATIRC Full Stack Development programme, including beginner to advanced modules.',
        category: 'Learning',
        fileUrl: 'https://res.cloudinary.com/atirc/raw/upload/fl_attachment/uploads/resources/fullstack-curriculum.pdf',
        fileType: 'PDF',
        fileSize: '1.8 MB',
        coverImage: ''
      },
      {
        title: 'Cybersecurity Best Practices Guide',
        description: 'Essential cybersecurity practices for organizations and individuals, aligned with ATIRC training standards.',
        category: 'Learning',
        fileUrl: 'https://res.cloudinary.com/atirc/raw/upload/fl_attachment/uploads/resources/cybersecurity-guide.pdf',
        fileType: 'PDF',
        fileSize: '3.1 MB',
        coverImage: ''
      },
      {
        title: 'ATIRC Annual Impact Report 2025',
        description: 'Annual report detailing ATIRC programmes, research output, incubation success stories, and community impact.',
        category: 'Reports',
        fileUrl: 'https://res.cloudinary.com/atirc/raw/upload/fl_attachment/uploads/resources/annual-impact-report-2025.pdf',
        fileType: 'PDF',
        fileSize: '5.6 MB',
        coverImage: ''
      },
      {
        title: 'Startup Pitch Deck Template',
        description: 'Professional pitch deck template for incubation applicants, aligned with ATIRC incubation review criteria.',
        category: 'Templates',
        fileUrl: 'https://res.cloudinary.com/atirc/raw/upload/fl_attachment/uploads/resources/pitch-deck-template.pptx',
        fileType: 'PPTX',
        fileSize: '4.2 MB',
        coverImage: ''
      },
      {
        title: 'Research Proposal Template',
        description: 'Structured research proposal template for ATIRC research applicants, including abstract, methodology, and budget sections.',
        category: 'Templates',
        fileUrl: 'https://res.cloudinary.com/atirc/raw/upload/fl_attachment/uploads/resources/research-proposal-template.docx',
        fileType: 'DOCX',
        fileSize: '0.5 MB',
        coverImage: ''
      },
      {
        title: 'AI/ML Datasets Collection',
        description: 'Curated public datasets for AI and machine learning projects, used across ATIRC data science training modules.',
        category: 'Datasets',
        fileUrl: 'https://res.cloudinary.com/atirc/raw/upload/fl_attachment/uploads/resources/ai-ml-datasets.zip',
        fileType: 'ZIP',
        fileSize: '12.0 MB',
        coverImage: ''
      },
      {
        title: 'ATIRC Internship Opportunities Pack',
        description: 'Current internship and traineeship opportunities available through ATIRC and its partner organizations.',
        category: 'Reports',
        fileUrl: 'https://res.cloudinary.com/atirc/raw/upload/fl_attachment/uploads/resources/internship-pack.pdf',
        fileType: 'PDF',
        fileSize: '1.2 MB',
        coverImage: ''
      }
    ];

    for (const sample of samples) {
      const resource = repository.create(sample);
      await repository.save(resource);
    }

    console.log(`Seeded ${samples.length} resources`);
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedResources();
