import { Router } from 'express';
import * as resourceController from '../controllers/resource.controller';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.get('/', resourceController.getResources);
router.get('/:id', resourceController.getResourceById);
router.post('/:id/download', requireAuth, resourceController.trackDownload);
router.post('/', requireAuth, requireRole('admin'), resourceController.createResource);

export default router;
