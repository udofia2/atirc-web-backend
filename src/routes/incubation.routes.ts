import { Router } from 'express';
import * as incubationController from '../controllers/incubation.controller';

const router = Router();

router.post('/', incubationController.createIncubantee);
router.get('/', incubationController.getIncubantees);
router.get('/:id', incubationController.getIncubanteeById);

export default router;
