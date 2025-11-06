import express from "express";
import {
  loginPage,
  registerPage,
  loginUser,
  registerUser,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", loginPage);
router.get("/", registerPage);

router.post("/lForm", loginUser);
router.post("/rForm", registerUser);
router.post("/logout", logout);

export default router;
