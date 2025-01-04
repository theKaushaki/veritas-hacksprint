const router = require('express').Router();
const departmentSchema = require('../models/departmentModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const notificationModel = require('../models/notificationModel');
require('dotenv').config();

const departmentController = {
    createDepartment: async (req, res) => {
        try {
            const { fullName, employeeId, email, department, password, universityId } = req.body;
            const faculty = await departmentSchema.create({ fullName, employeeId, department, email, password, universityId });

            // send notification to the university admin for verification

            console.log(faculty);
            res.status(200).json({ message: 'Department created successfully' });
        } catch (error) {
            console.log('Create department error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    getAllDepartments: async (req, res) => {
        try {
            const faculties = await departmentSchema.find();
            res.status(200).json({ faculties });
        } catch (error) {
            console.log('Get all departments error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const faculty = await departmentSchema.findOne({ email });

            if (!faculty) {
                return res.status(404).json({ message: 'You are not authorized to access this page' });
            }

            const isPasswordValid = await argon2.verify(faculty.password, password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: faculty._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ message: 'Department logged in successfully' });

        } catch (error) {
            console.log('Login error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    getAllNotifications: async (req, res) => {
        try {
            const notifications = await notificationModel.find();
            res.status(200).json(notifications);
        } catch (error) {
            console.log('Get all notifications error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};

router.post('/create', departmentController.createDepartment);
router.get('/all', departmentController.getAllDepartments);
router.post('/login', departmentController.login);
router.get('/notifications', departmentController.getAllNotifications);
module.exports = router;