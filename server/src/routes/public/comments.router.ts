import { Router } from 'express';
import controller from '../../controllers/comments.controller';

const router = Router();

router.get('/get/:id', controller.getComments);
router.post('/create', controller.createComment);
// router.post('/update', controller.updatComment);
router.delete('/delete', controller.deleteComment);

export default router;
