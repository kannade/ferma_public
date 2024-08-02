import { Router } from "express";
import passport from "passport";
import fermController from "../../controllers/ferm.controller";
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

// router.use((req, res, next) => {
//   console.log("Headers:", req.headers);
//   console.log("Body:", req.body);
//   console.log("Query Params:", req.query);
//   console.log("Params:", req.params);
//   next();
// });

router.get("/getFerms", authenticate, checkAuth, fermController.getFerms);
router.post("/addFerm", authenticate, checkAuth, fermController.addFerm);
router.delete(
  "/deleteFerm/:id",
  authenticate,
  checkAuth,
  fermController.deleteFerm
);
router.get("/get/:id/:key", fermController.getFerm);
router.post("/addSensors/:id/:key", fermController.addSensorsData);
router.get(
  "/getShortFerm",
  authenticate,
  checkAuth,
  fermController.getShortFerm
);

export default router;
