const nodemailer = require('nodemailer');

require('dotenv').config();

var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USERNAME, 
        pass: process.env.SMTP_PASSWORD
    }
});

const sendMail = async (to, subject, text, html) => {
    const mailOptions = {
        from: process.env.SMTP_MAIL_FROM,
        to: to,
        subject: subject, 
        text: text,
        html: html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

module.exports = { sendMail };