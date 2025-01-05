const jwt = require("jsonwebtoken");
const { userRoles } = require("../models/userModel");

const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(403).json({ error: "Access denied. No token provided." });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!Object.values(userRoles).includes(req.user.role))
        return res.status(403).json({ error: "Access denied. Invalid role." });

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error.message);
      res.status(403).json({ error: "Access denied. Invalid or expired token." });
    }
  };
};

module.exports = authorizeRoles;
