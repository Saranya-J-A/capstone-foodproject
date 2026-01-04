// backend/middlewares/authUser.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    //  MUST match login JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //  Attach user id
    req.user = decoded.id;

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
