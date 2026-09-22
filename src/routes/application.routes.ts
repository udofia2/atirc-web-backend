import { Router } from 'express';
import * as applicationController from '../controllers/application.controller';

const router = Router();

router.post('/', applicationController.createJobApplication);
router.get('/', applicationController.getJobApplications);
router.get('/:id', applicationController.getJobApplicationById);

export default router;
