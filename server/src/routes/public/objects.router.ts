import { Router } from 'express';
import controller from '../../controllers/objects.controller';

const router = Router();

router.get('/objects', controller.getAllObjects);

export default router;
