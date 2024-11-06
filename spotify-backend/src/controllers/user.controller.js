import userModel from "../models/users.model.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const signupUser = async (req, res) => {
  try {
    const { userName, password, role, secretCode } = req.body;

    if ((role === "admin") & (secretCode !== process.env.ADMIN_SECRET_KEY)) {
      return res.status(400).json({
        error: "Cannot register as admin without authorization code!",
      });
    }

    const existingUser = await userModel.findOne({
      userName: userName,
    });
    if (existingUser) {
      return res.status(409).json({ error: "User name already existed!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      userName,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(200).json({ message: "New user created successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Error Occurred!" });
  }
};

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await userModel.findOne({ userName });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "1h" });

    res.json({ message: "Login successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Error occurred!" });
  }
};

export { signupUser, login };
