const router = require('express').Router();
const studentSchema = require('../models/studentModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const studentController = {
    signup: async (req, res) => {
        try {
            const { fullName, studentId, branch, email, password, universityId } = req.body;
            const student = await studentSchema.create({ fullName, studentId, branch, email, password, universityId });
            const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ message: 'Student created successfully', token });
        } catch (error) {
            console.log('Create student error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const student = await studentSchema.findOne({ email });

            if (!student) {
                return res.status(404).json({ message: 'You are not authorized to access this page' });
            }

            const isPasswordValid = await argon2.verify(student.password, password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ message: 'Student logged in successfully', token });

        } catch (error) {
            console.log('Login error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    getProfile: (req, res) => {
        try {

        } catch (error) {

        }
    },
}

router.post('/signup', studentController.signup);
router.post('/login', studentController.login);
router.get('/profile', studentController.getProfile);

module.exports = router;