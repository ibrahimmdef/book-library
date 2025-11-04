import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  res.render("profile.ejs", {
    id: req.session.user.id,
    username: req.session.user.username,
    email: req.session.user.email,
  });
});

export default router;
