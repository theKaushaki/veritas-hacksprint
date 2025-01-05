const submissionModel = require('../models/submissionModel');
const { roles } = require('../models/userModel');

const router = require('express').Router();

const getSubmissions = async (req, res) => {
    try {
        const user = req.user;
        if (user.role != roles.DEPARTMENT) {
            return res.status(401).json({ message: 'You are not authorized to access this page' });
        }
        const submissions = await submissionModel.find({ }).populate('procedureId').populate('studentId');
        return res.status(200).json(submissions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching submissions', error: error.message });
    }
};

router.get('/', getSubmissions);

module.exports = router;