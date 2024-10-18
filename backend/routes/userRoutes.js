import express from "express";
import { register, login } from "../controllers/authController.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  login
);

export default router;
