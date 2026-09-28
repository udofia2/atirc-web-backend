import { Router } from 'express';
import contactRoutes from './contact.routes';
import researcherRoutes from './researcher.routes';
import incubationRoutes from './incubation.routes';
import applicationRoutes from './application.routes';
import authRoutes from './auth.routes';
import resourceRoutes from './resource.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/researchers', researcherRoutes);
router.use('/incubantees', incubationRoutes);
router.use('/applications', applicationRoutes);
router.use('/resources', resourceRoutes);

export default router;
