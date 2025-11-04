import bcrypt from "bcrypt";
import db from "../db/index.js";

const saltRounds = 10;

// LOGIN PAGE
export const loginPage = (req, res) => {
  if (req.session.user) {
    return res.redirect("/profile");
  }
  res.render("auth/login.ejs");
};

// REGISTER PAGE
export const registerPage = (req, res) => {
  if (req.session.user) {
    return res.redirect("/profile");
  }
  res.render("auth/register.ejs");
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const emailOrUsername = req.body.username;
  const loginPassword = req.body.password;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [emailOrUsername]
    );

    if (result.rows.length === 0) return res.send("User not found");

    const user = result.rows[0];

    // Compare password
    const match = await bcrypt.compare(loginPassword, user.password_hash);

    if (!match) {
      return res.send("Incorrect password");
    }

    // Save session
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.redirect("/profile");
  } catch (err) {
    console.log(err);
    res.send("Error logging in");
  }
};

// REGISTER USER
export const registerUser = async (req, res) => {
  const { username, email, password1, password2 } = req.body;

  try {
    // Check existing user
    const check = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (check.rows.length > 0) {
      return res.send("Email or Username already exists.");
    }

    if (password1 !== password2) {
      return res.send("Passwords do not match");
    }

    // Hash password using saltRounds
    const hashedPassword = await bcrypt.hash(password1, saltRounds);

    const insert = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    const newUser = insert.rows[0];

    // Save session
    req.session.user = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    res.redirect("/profile");
  } catch (err) {
    console.log(err);
    res.send("Error registering");
  }
};
