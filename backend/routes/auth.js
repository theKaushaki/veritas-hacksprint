const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");

const User = require("../models/User");
const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 5, message: { error: "Too many login attempts. Please try again later." },
});

const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 5, message: { error: "Too many signup attempts. Please try again later." },
});

router.post(
  "/signup",
  signupLimiter,
  [
    body("universityEmail").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("name").notEmpty().withMessage("Name is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { universityEmail, password, name, role = "student" } = req.body;

      const existingUser = await User.findOne({ universityEmail });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        universityEmail,
        password: hashedPassword,
        name,
        role, status: "active",
      });

      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
          name: newUser.name,
          role: newUser.role,
          universityEmail: newUser.universityEmail,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { id: newUser._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        message: "Signup successful",
        token,
        refreshToken,
        user: {
          id: newUser._id,
          name: newUser.name,
          role: newUser.role,
          universityEmail: newUser.universityEmail,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/login",
  loginLimiter,
  [
    body("universityEmail").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { universityEmail, password } = req.body;

      const user = await User.findOne({ universityEmail });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      if (user.status !== "active") {
        return res.status(403).json({ error: "Your account is inactive or suspended" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          role: user.role,
          universityEmail: user.universityEmail,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
          universityEmail: user.universityEmail,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const newAccessToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
        universityEmail: user.universityEmail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" });

    res.status(200).json({
      message: "Access token refreshed successfully",
      newAccessToken,
    });
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    res.status(401).json({ error: "Invalid refresh token" });
  }
});

module.exports = router;
