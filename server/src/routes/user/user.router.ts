import { Router } from "express";
import passport from "passport";
import userController from "../../controllers/user.controller";
import {
  AuthenticationMiddleware,
  checkAuth,
} from "../../middlewares/authenticationMiddleware";

const router = Router();
const authenticate = passport.authenticate("jwt", { session: false });
// router.use(
//   passport.authenticate("jwt", { session: false }),
//   AuthenticationMiddleware
// );

router.get("/getProfile", authenticate, checkAuth, userController.getProfile);

export default router;
