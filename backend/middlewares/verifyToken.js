const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please login again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token. Access denied." });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = verifyToken;
