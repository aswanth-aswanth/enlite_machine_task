import express from "express";
import {
  register,
  login,
  getAllUsers,
  editUser,
  deleteUser,
} from "../controllers/userController.js";
import { check } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";

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

router.get("/users", authMiddleware, getAllUsers);

router.put("/user/:id", authMiddleware, editUser);

router.delete("/user/:id", authMiddleware, deleteUser);

export default router;
