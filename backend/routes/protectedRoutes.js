const express = require("express");
const verifyToken = require("../middleware/verifyToken"); // Import middleware
const router = express.Router();

// Example: Protected route
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Welcome to the protected route!",
    user: req.user, // Contains user data decoded from the token
  });
});

module.exports = router;
