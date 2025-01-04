const { default: mongoose } = require("mongoose");
const notificationModel = require("../models/notificationModel");
const router = require("express").Router();

const notificationController = {
    getNotifications: async (req, res) => {
        try {
            const user = req.user;
            user.id = mongoose.Types.ObjectId(user.id);
            const notifications = await notificationModel.
                find({ recipientId: user.id });
            return res.json(notifications);
        } catch (error) {
            console.log("Error at getNotifications", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    markAsRead: async (req, res) => {
        try {
            const user = req.user;
            const { notificationIds } = req.body;
            await notificationModel
                .updateMany({ _id: { $in: notificationIds } }, { isRead: true });
            res.json({ message: 'Marked as read' });
        } catch (error) {
            console.log("Error at markAsRead", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
}

router.get('/', notificationController.getNotifications);
router.post('/mark', notificationController.markAsRead);

module.exports = router;