const express = require('express');
const router = express.Router();

const departmentRoutes = require('./departmentRouters');
const procedureRoutes = require('./procedureRouters');
const studentRoutes = require('./studentRouters');
const { superAdminRouter } = require('./superAdminRouters');
const notificationRouter = require('./notificationRouters')

router.use('/departments', departmentRoutes);
router.use('/procedures', procedureRoutes);
router.use('/students', studentRoutes);
router.use('/superAdmin', superAdminRouter);
router.use('/notifications', notificationRouter);

module.exports = router;
