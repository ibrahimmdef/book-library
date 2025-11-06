import express from "express";
const router = express.Router();

router.get("/books", (req, res) => res.render("books.ejs"));
router.get("/dashboard", (req, res) => res.render("dashboard.ejs"));
router.get("/add", (req, res) => res.render("addbook.ejs"));

export default router;
