import { Router } from 'express';
import contactRoutes from './contact.routes';
import researcherRoutes from './researcher.routes';
import incubationRoutes from './incubation.routes';
import applicationRoutes from './application.routes';

const router = Router();

router.use('/contact', contactRoutes);
router.use('/researchers', researcherRoutes);
router.use('/incubantees', incubationRoutes);
router.use('/applications', applicationRoutes);

export default router;
