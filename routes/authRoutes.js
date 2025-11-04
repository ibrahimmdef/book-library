import express from "express";
import {
  loginPage,
  registerPage,
  loginUser,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", loginPage);
router.get("/register", registerPage);

router.post("/lForm", loginUser);
router.post("/rForm", registerUser);

export default router;
