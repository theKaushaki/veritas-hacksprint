const argon2 = require('argon2');
const express = require('express');
const universityModel = require('../models/universityModel');
const router = express.Router();
const jwt = require('jsonwebtoken');

const superAdminController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const superAdmin = await universityModel.findOne({ email });

            if (!superAdmin) {
                return res.status(404).json({ message: 'You are not authorized to access this page' });
            }

            const isPasswordValid = await argon2.verify(superAdmin.password, password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: superAdmin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Super Admin logged in successfully' });
        } catch (error) {
            console.log('Login error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    createUniversity: async (email, password) => {
        try {
            const hashedPassword = await argon2.hash(password);
            const university = await universityModel.create({ email, password: hashedPassword , name: 'IIT Madras Bs'});
            console.log(university);
        } catch (error) {
            console.log('Create university error:', error);
        }
    }
}

router.post('/login', superAdminController.login);
router.post('/createUniversity', superAdminController.createUniversity);


module.exports = { superAdminRouter: router,superAdminController };