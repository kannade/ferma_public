import { Router } from 'express';
import controller from '../../controllers/objectsTypeData.controller';

const router = Router();

router.get('/objectType', controller.getAllObjects);

export default router;
