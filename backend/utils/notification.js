const sendMessageToUser = require("..");
const notificationModel = require("../models/notificationModel");
const userModel = require("../models/userModel");
const { sendEmail } = require("./email")

const notification = {
    appendNotification: async (userId, message, recipientType) => {
        try {
            await notificationModel.create({
                recipientId: userId,
                recipientType,
                message,
                isRead: false,
                link: ''
            });
        } catch (error) {
            console.log("Error at appendNotification", error);
        }
    },
    notifiyUserById: async (userId, message) => {
        // const user = await studentModel.findById(userId);
        // if (user) {
        sendMessageToUser(userId, message);
        this.appendNotification(userId, message, 'student');
        // if (user.allowEmails) {
        //     sendEmail(user.email, message);
        // }
        // }
    },

    // notifyAllUsers: async (message) => {
    //     try {
    //         const students = await studentModel.find({ allowEmails: true });
    //         students.forEach(student => {
    //             sendMessageToUser(student._id, message);
    //             this.appendNotification(student._id, message, 'student');
    //             // if (student.allowEmails) {
    //             //     sendEmail(student.email, message);
    //             // }
    //         });
    //     } catch (error) {
    //         console.log("Error at notifyAllUsers", error);
    //     }
    // },

    // notifyUserByBranch: async (branch, message) => {
    //     try {
    //         const students = await studentModel.find({ branch, allowEmails: true });
    //         students.forEach(student => {
    //             sendMessageToUser(student._id, message);
    //             this.appendNotification(student._id, message, 'student');
    //             // if (student.allowEmails) {
    //             //     sendEmail(student.email, message);
    //             // }
    //         });
    //     } catch (error) {
    //         console.log("Error at notifyUserByBranch", error);
    //     }
    // },

    notifyFaculty: async (facultyIds, message) => {
        try {
            const departments = await userModel.find({ role: userModel.roles.DEPARTMENT, });
            
            departments.forEach(department => {
                sendMessageToUser(department.id, message);
                this.appendNotification(department.id, message, 'faculty');
                // if (department.allowEmails) {
                //     sendEmail(department.email, message);
                // }
            });
        } catch (error) {
            console.log("Error at notifyFaculty", error);
        }
    }
};

module.exports = notification;
