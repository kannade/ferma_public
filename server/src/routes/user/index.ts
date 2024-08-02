import { Router } from "express";
import fermRouter from "./ferm.router";
import userRouter from "./user.router";

const router = Router();

router.use("/user", userRouter);
router.use("/ferm", fermRouter);

export default router;
