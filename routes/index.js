import { Router } from "express";
import authRouter from "./auth.js";
import postsRouter from "./post.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/posts", postsRouter);

export default router;
