import { Router } from "express";
import { validateUser, validateLogin } from "../middlewares/validation.js";
import {
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/sign-up", getSignUp);

authRouter.post("/sign-up", validateUser, postSignUp);

authRouter.get("/login", getLogin);

authRouter.post("/login", validateLogin, postLogin);

export default authRouter;
