const router = require('express').Router();
const procedureModel = require('../models/procedureModel');
const submissionModel = require('../models/submissionModel');
const { userRoles } = require('../models/userModel');
const notification = require('../utils/notification');
// const notification = require('../utils/notification');

const procedureController = {
    createProcedure: async (req, res) => {
        try {
            const user = req.user;
            if (user.role !== 'admin') {
                return res.status(401).json({ message: 'You are not authorized to create procedures' });
            }

            const { title, description, createdBy, assignedTo, deadline, formFields, branch } = req.body;
            const procedure = await procedureModel.create({ title, description, createdBy, assignedTo, deadline, formFields, branch });

            if (branch === 'All') {
                // notification.notifyAllUsers('New procedure created');
            } else {
                // notification.notifyUserByBranch(branch, 'New procedure created');
            }

            res.status(201).json(procedure);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getProcedures: async (req, res) => {
        try {
            const branch = req.query.branch;
            if (branch) {
                const procedures = await procedureModel.find({ branch });
                return res.status(200).json(procedures);
            }

            const procedures = await procedureModel.find();
            res.status(200).json(procedures);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getProcedureById: async (req, res) => {
        try {
            const procedure = await procedureModel.findById(req.params.id);
            res.status(200).json(procedure);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateProcedure: async (req, res) => {
        try {
            const user = req.user;
            if (user.role !== userRoles.UNIVERSITY)
                return res.status(401).json({ message: 'You are not authorized to access this page' });

            const procedure = await procedureModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(procedure);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteProcedure: async (req, res) => {
        try {
            const user = req.user;
            if (user.role !== userRoles.UNIVERSITY)
                return res.status(401).json({ message: 'You are not authorized to access this page' });

            await procedureModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Procedure deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    applyProcedure: async (req, res) => {
        try {
            const { responses } = req.body;
            const user = req.user;
            console.log(user);
            const procedure = await procedureModel.findById(req.params.id);
            if (!procedure)
                return res.status(404).json({ message: 'Procedure not found' });

            submissionModel.create({ procedureId: req.params.id, responses, studentId: user.id });
            notification
                .appendNotification(user._id, `Student ${user.id} submitted form ${req.params.id}`, 'department');

            res.status(201).json({ message: 'Procedure applied successfully' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

router.post('/create', procedureController.createProcedure);
router.get('/all', procedureController.getProcedures);
router.get('/:id', procedureController.getProcedureById);
router.put('/:id', procedureController.updateProcedure);
router.delete('/:id', procedureController.deleteProcedure);
router.post('/:id/apply', procedureController.applyProcedure);


module.exports = router;

