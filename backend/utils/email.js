const sgMail = require('@sendgrid/mail')
require('dotenv').config();

const email = {
    sendEmail: async (email, subject, message) => {
        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                to: 'gireeshbhat68@gmail.com',
                from: 'uniformupms@gmail.com',
                subject: subject,
                html: `<strong>${message}</strong>`,
            }
            // sgMail.send(msg)
            //     .then(() => {
            //         console.log('Email sent to', email)
            //     })
            //     .catch((error) => {
            //         console.error(error)
            //     })
        } catch (error) {
            console.error("Error sending email:", error);
        }
    },
}

email.sendEmail('gireeshbhat68@gmail.com', 'Test email', 'This is a test email');

module.exports = email;
