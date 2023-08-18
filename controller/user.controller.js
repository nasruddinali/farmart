const usersCtrl = {};
const path = require("path");
const User = require("../models/User");
var async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const loginForm = async(req, res)=> {
  res.render("login")
}

const registerForm = async(req, res) =>{ 

  res.render("register");

  // const indexPath = path.join(
  //   __dirname,
  //   "../../farmart/views",
  //   "signup.html"
  // );
  // res.status(200).sendFile(indexPath);

}
const register = async (req, res) => {
  const { name, username, password } = req.body;

  const email = username;

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
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const email = username;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Generate JWT
  const token = generateAccessToken( user._id );

  res.status(200).json({ message: "Authentication successful", token });
};
function generateAccessToken(user){
  jwt.sign({user}, process.env.AUTH_SECRET_KEY, { expiresIn: "10s" })
}
const findAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

const homePage = (req,res)=> {
  res.render("index");
}

const logout = (req, res)=> {
  req.logout();
  res.send('Logged out');
}

module.exports = { register, login, findAllUser,registerForm, loginForm ,homePage,logout};
