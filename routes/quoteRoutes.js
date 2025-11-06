import express from "express";
import { addQuote, getUserQuotes } from "../controllers/quoteController.js";

const router = express.Router();

router.get("/quotes", getUserQuotes);

router.post("/add-quotes", addQuote);

export default router;
