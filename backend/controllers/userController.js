import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

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

    return res.status(201).json({ message: "User registered successfully" });
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
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.userId } }).select(
      "-password"
    );
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const editUser = async (req, res) => {
  const userId=req.params.id;
  const { username, email } = req.body;
  console.log("userId : ",userId);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      const isUsernameTaken = await User.findOne({
        username,
        _id: { $ne: userId },
      });
      if (isUsernameTaken) {
        return res.status(409).json({ message: "Username is already taken" });
      }
      user.username = username;
    }

    if (email) {
      const isEmailTaken = await User.findOne({
        email,
        _id: { $ne: userId },
      });
      if (isEmailTaken) {
        return res.status(409).json({ message: "Email is already taken" });
      }
      user.email = email;
    }

    const updatedUser=await user.save();
    res.status(200).json({ message: "User updated successfully",updatedUser:updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
