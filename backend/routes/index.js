const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
const authRoutes = require("./auth");
const mongoose = require('mongoose');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Database Connection
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("./auth", authRoutes); // Integrate the auth.js routes

// Default Route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const departmentRoutes = require('./departmentRouters');
const procedureRoutes = require('./procedureRouters');
const studentRoutes = require('./studentRouters');
const { superAdminRouter } = require('./superAdminRouters');


router.use('/departments', departmentRoutes);
router.use('/procedures', procedureRoutes);
router.use('/students', studentRoutes);
router.use('/superAdmin', superAdminRouter);


module.exports = router;
