const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleWare');

const departmentRoutes = require('./departmentRouters');
const procedureRoutes = require('./procedureRouters');
const studentRoutes = require('./studentRouters');
const { superAdminRouter } = require('./superAdminRouters');
const notificationRouter = require('./notificationRouters')

router.use('/departments',authMiddleware, departmentRoutes);
router.use('/procedures',authMiddleware, procedureRoutes);
router.use('/students',authMiddleware, studentRoutes);
router.use('/superAdmin',authMiddleware, superAdminRouter);
router.use('/notifications',authMiddleware, notificationRouter);

module.exports = router;
