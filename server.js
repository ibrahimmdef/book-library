import express from "express";
import dotenv from "dotenv";
import session from "express-session";

import db from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// CONNECT DB
db.connect();

// ROUTES
app.use("/", authRoutes);

app.use((req, res, next) => {
  const publicPaths = ["/login", "/register"];

  if (!req.session.user && !publicPaths.includes(req.path)) {
    return res.redirect("/login");
  }

  next();
});

app.use("/", pageRoutes);
app.use("/profile", profileRoutes);

app.listen(port, () => console.log("Server running on port 3000"));
