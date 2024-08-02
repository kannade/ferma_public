import { Router } from 'express';
import passport from 'passport';
import userController from '../../controllers/user.controller';
import { AdminMiddleware } from '../../middlewares/admin.middleware';
import { AuthenticationMiddleware } from '../../middlewares/authenticationMiddleware';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }), AdminMiddleware);

router.get('/users', userController.getAllUsers);

export default router;
