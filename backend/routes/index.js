const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleWare');

const procedureRoutes = require('./procedureRouters');
const studentRoutes = require('./studentRouters');
const authRoutes = require('./auth');
// const notificationRouter = require('./notificationRouters')

router.use('/procedures',authMiddleware, procedureRoutes);
router.use('/students',authMiddleware, studentRoutes);
router.use('/',authRoutes)
// router.use('/notifications',authMiddleware, notificationRouter);

module.exports = router;
