const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token and authenticate user
 */
const verifyToken = (req, res, next) => {
  try {
    // Check for token in the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user details to the request object
    req.user = {
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
      universityEmail: decoded.universityEmail,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error.message);

    // Handle specific errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please login again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token. Access denied." });
    }

    // General error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = verifyToken;
