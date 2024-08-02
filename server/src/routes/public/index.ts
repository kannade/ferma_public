import { Router } from "express";
import authRouter from "./auth.router";
// import objectsRouter from './objects.router';
// import objectsRelRouter from './objectsRelationships.router';
// import objectsTypeRouter from './objectsTypeData.router';
// import postRouter from './posts.router';
// import commentsRouter from './comments.router';
import fermRouter from "./ferm.router";
import emailRouter from "./email.router";

const router = Router();

router.use("/auth", authRouter);
// router.use('/basic', objectsRouter);
// router.use('/basic', objectsRelRouter);
// router.use('/basic', objectsTypeRouter);
//router.use('/posts', postRouter);
// router.use('/comment', commentsRouter);
// router.use("/ferm", fermRouter);
router.use("/email", emailRouter);

export default router;
