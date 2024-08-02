import { Router } from 'express';
import controller from '../../controllers/email.controller';

const router = Router();

router.post('/sendEmail', controller.getInstance().sendEmail);

export default router;
