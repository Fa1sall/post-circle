import { Router } from "express";
import { validateUser } from "../middlewares/validation.js";
import { validationResult } from "express-validator";
import { genPassword } from "../utils/password.js";
import { createUser } from "../models/users.js";

const authRouter = Router();

authRouter.get("/sign-up", (req, res) => {
  res.render("auth/sign-up", { errors: {}, formData: {} });
});

authRouter.post("/sign-up", validateUser, async (req, res) => {
  const errors = validationResult(req);
  console.log(errors.mapped());
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.render("auth/sign-up", {
      errors: errors.mapped(),
      formData: req.body,
    });
  }
  const { first_name, last_name, username, password } = req.body;
  const hashedPassword = await genPassword(password);
  await createUser(first_name, last_name, username, hashedPassword);
  res.redirect("/auth/login");
});

export default authRouter;
