// routes/pageRoutes.js
import express from "express";
import { getDashboard } from "../controllers/pageController.js";

const router = express.Router();

router.get("/dashboard", getDashboard);
router.get("/add", (req, res) => res.render("addbook.ejs"));

export default router;
