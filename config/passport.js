import passport from "passport";
import passportlocal from "passport-local";
import pool from "./database.js";
import { validatePassword } from "../utils/password.js";

// Setup Local Strategy
const LocalStrategy = passportlocal.Strategy;
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Fetch user from db
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      const user = rows[0];
      if (!user) {
        return done(null, false, { message: "Please enter a valid Username" });
      }

      // Check if password matches
      const match = await validatePassword(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }

      let safeUser = Object.assign({}, user);
      delete safeUser.password;
      return done(null, safeUser);
    } catch (error) {
      if (error) {
        return done(error);
      }
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, first_name, last_name, username, ismember, isadmin FROM users WHERE id = $1",
      [id]
    );
    const user = rows[0];
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});
