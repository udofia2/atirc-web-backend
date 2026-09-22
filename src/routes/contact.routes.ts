import { Router } from 'express';
import * as contactController from '../controllers/contact.controller';

const router = Router();

router.post('/', contactController.createContact);
router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContactById);

export default router;
