import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: errors.array() });
    }

    const { email, username, password } = req.body;

    const isEmailTaken = await User.findOne({ email });
    const isUsernameTaken = await User.findOne({ username });

    if (isEmailTaken) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    if (isUsernameTaken) {
      return res
        .status(409)
        .json({ message: "Username is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};
