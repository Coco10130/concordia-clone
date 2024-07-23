const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  comparePassword,
} = require("../helpers/authenticate.helper");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user entered email address
    if (email === "") {
      return res.status(200).json({ message: "Email is required" });
    }

    // check if use exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    // Check if password match
    const match = await comparePassword(password, user.password);

    if (match) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          name: user.name,
          isSeller: user.isSeller,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) throw err;

          res
            .cookie("token", token, { httpOnly: true })
            .status(200)
            .json({ user: user, token: token });
        }
      );
    } else {
      return res.status(201).json({ message: "Password not match" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if name entered
    if (!name) {
      return res.status(200).json({ message: "Name is required." });
    }

    // Check if email entered
    if (!email) {
      return res.status(200).json({ message: "Email is required." });
    }

    // Check if password entered
    if (!password || password.length < 8) {
      return res.status(200).json({
        message: "Password is required and at least 8 characters long.",
      });
    }

    // Check if confirm password match
    if (password !== confirmPassword) {
      return res.status(200).json({ message: "Password does not match." });
    }

    // Check if email is already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(200).json({ message: "Email already exists." });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    await User.create(userData);
    res.status(201).json({ success: "User created successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(401).json({ message: "Invalid authorization token" });
    }
  }
};

const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ success: "Logout successfuly" });
};

module.exports = {
  login,
  register,
  getProfile,
  logout,
};
