const usersCtrl = {};
const path = require("path");
const User = require("../models/User");
var async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginForm = async (req, res) => {
  res.render("login");
};

const registerForm = async (req, res) => {
  res.render("register");
};
const register = async (req, res) => {
  const { name, username, password } = req.body;

  const email = username;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(401).render('userExist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).render('login');
  } catch (error) {
    console.error(error);
    res.status(500).render('errorPage');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const email = username;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).render('userNotFound');
  }
  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).render('errorPage');
  }

  // Generate JWT
  const token = generateAccessToken(user._id);

  res.status(200).render('filesHome');
};
function generateAccessToken(user) {
  jwt.sign({ user }, process.env.AUTH_SECRET_KEY, { expiresIn: "10s" });
}
const findAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};


const logout = (req, res) => {
  req.logout();
  res.send("Logged out");
};
const error = (req, res)=>{
  res.render('home')
}
const exist = (req, res)=>{
  res.render('userExist')
}
const notfound = (req, res)=>{
  res.render('userNotFound')
}
const getUserById = (req, res)=>{

}
const home = (req, res)=> {
  res.render('usersHome');
}
module.exports = {
  register,
  login,
  findAllUser,
  registerForm,
  loginForm,
  logout,
  error,
  exist,
  notfound,
  getUserById, 
  home
};
