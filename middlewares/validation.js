import { body } from "express-validator";
import pool from "../config/database.js";

export const validateUser = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage(`First name must contain only letters`)
    .isLength({ max: 50 })
    .withMessage(`First name must be within 50 characters`),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage(`Last name must contain only letters`)
    .isLength({ max: 50 })
    .withMessage(`Last name must be within 50 characters`),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 50 })
    .withMessage("Username must be within 50 characters")
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(
      "Username can contain letters, numbers, '.', '-', '_' but no spaces"
    )
    .custom(async (value) => {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [value]
      );
      const user = rows[0];
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 - 20 characters"),
  body("confirm_password")
    .notEmpty()
    .withMessage("Please re-enter your password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Please enter the same password"),
];

export const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 50 })
    .withMessage("Username must be within 50 characters")
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage(
      "Username can contain letters, numbers, '.', '-', '_' but no spaces"
    ),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 - 20 characters"),
];
