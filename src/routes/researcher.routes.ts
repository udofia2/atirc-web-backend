import { Router } from 'express';
import * as researcherController from '../controllers/researcher.controller';

const router = Router();

router.post('/', researcherController.createResearcher);
router.get('/', researcherController.getResearchers);
router.get('/:id', researcherController.getResearcherById);

export default router;
