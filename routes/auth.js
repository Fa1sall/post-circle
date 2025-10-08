import { Router } from "express";
import { validateUser, validateLogin } from "../middlewares/validation.js";
import {
  renderSignUpPage,
  handleSignUp,
  renderLoginPage,
  handleLogin,
  handleLogout,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/sign-up", renderSignUpPage);

authRouter.post("/sign-up", validateUser, handleSignUp);

authRouter.get("/login", renderLoginPage);

authRouter.post("/login", validateLogin, handleLogin);

authRouter.post("/logout", handleLogout);

export default authRouter;
