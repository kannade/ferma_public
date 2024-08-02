import { Router } from "express";
import publicRouter from "./public";
// import adminRouter from './admin/admin';
import userRouter from "./user";

const router = Router();

router.use("/public", publicRouter);
// router.use('/admin', adminRouter);
router.use("/user", userRouter);

export default router;
