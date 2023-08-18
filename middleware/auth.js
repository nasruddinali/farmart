const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.AUTH_SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;
