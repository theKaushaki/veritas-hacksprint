// Import required modules
const jwt = require("jsonwebtoken");

// Middleware to authorize based on roles
const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Ensure token exists
      const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"
      if (!token) {
        return res.status(403).json({ error: "Access denied. No token provided." });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to request object

      // Check if user role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied. Insufficient permissions." });
      }

      next(); // Proceed to next middleware or route handler
    } catch (error) {
      console.error("Authorization error:", error.message);
      res.status(403).json({ error: "Access denied. Invalid or expired token." });
    }
  };
};

module.exports = authorizeRoles;
