import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  renderPosts,
  renderCreatePostPage,
  handleCreatePost,
} from "../controllers/postController.js";

const postsRouter = Router();

postsRouter.get("/", renderPosts);
postsRouter.get("/create", isAuthenticated, renderCreatePostPage);
postsRouter.post("/create", isAuthenticated, handleCreatePost);

export default postsRouter;
