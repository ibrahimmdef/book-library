import express from "express";
import {
  getAllBooks,
  getReadBooks,
  getWantBooks,
  addBook,
  bookDelete,
  bookFinish,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/add-book", addBook);
router.get("/books", getAllBooks);
router.get("/read", getReadBooks);
router.get("/want", getWantBooks);
router.post("/books/delete/:id", bookDelete);
router.post("/books/finish/:id", bookFinish);
export default router;
