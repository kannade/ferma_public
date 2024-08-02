import { Router } from 'express';
import controller from '../../controllers/objectRelationships.controller';

const router = Router();

router.get('/objectRel', controller.getAllObjects);

export default router;
