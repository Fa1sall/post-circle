import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  renderPosts,
  renderCreatePostPage,
  handleCreatePost,
  handleDeletePost,
} from "../controllers/postController.js";

const postsRouter = Router();

postsRouter.get("/", renderPosts);
postsRouter.get("/create", isAuthenticated, renderCreatePostPage);
postsRouter.post("/create", isAuthenticated, handleCreatePost);
postsRouter.post("/delete/:id", handleDeletePost);

export default postsRouter;
