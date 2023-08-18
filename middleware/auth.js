require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.AUTH_SECRET_KEY;

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authheader  && authHeader.split(' ')[1] 

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.user = user;
    next();
  });
}

module.exports = verifyToken;
