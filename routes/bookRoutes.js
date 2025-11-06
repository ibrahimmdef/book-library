import express from "express";
import {
  getAllBooks,
  getReadBooks,
  getWantBooks,
  addBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/add-book", addBook);
router.get("/books", getAllBooks);
router.get("/read", getReadBooks);
router.get("/want", getWantBooks);
export default router;
