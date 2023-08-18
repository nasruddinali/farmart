const usersCtrl = {};
const path = require("path");
const User = require("../models/User");
var async = require("async");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("-------------->", { name, email, password });
  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = await User.findOne({ email });
  console.log("user------>", user);
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user._id }, process.env.AUTH_SECRET_KEY, { expiresIn: "1h" });

  res.status(200).json({ message: "Authentication successful", token });
};

const findAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

module.exports = { signUp, login, findAllUser };
