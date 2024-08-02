import { Router } from 'express';
import controller from '../../controllers/ferm.controller';

const router = Router();

router.get('/get/:id', controller.getFerm);

export default router;
