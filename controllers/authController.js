import { validationResult } from "express-validator";
import { genPassword } from "../utils/password.js";
import { createUser } from "../models/users.js";
import passport from "passport";

// Sign-Up Controllers

export const renderSignUpPage = (req, res) => {
  res.render("auth/sign-up", { errors: {}, formData: {} });
};

export const handleSignUp = async (req, res) => {
  const errors = validationResult(req);
  const { first_name, last_name, username, password } = req.body;
  console.log(errors.mapped());
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.render("auth/sign-up", {
      errors: errors.mapped(),
      formData: { first_name, last_name, username },
    });
  }
  const hashedPassword = await genPassword(password);
  await createUser(first_name, last_name, username, hashedPassword);
  res.redirect("/auth/login");
};

// Login Controllers

export const renderLoginPage = (req, res) => {
  res.render("auth/login", { errors: {}, formData: {} });
};

export const handleLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("auth/login", {
      errors: errors.mapped(),
      formData: { username: req.body.username },
    });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.render("auth/login", {
        errors: { login_error: info.message }, // info.message is the one setup in localstrategy
        formData: { username: req.body.username },
      });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/posts");
    });
  })(req, res, next);
};

export const handleLogout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
