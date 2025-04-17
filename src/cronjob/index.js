const { sendMail } = require('../config/mailer');
const { getAllUser } = require('../dbServices/user.dbService');
const User = require('../models/user.model');
const cron = require('node-cron');

const cronJob = async () => {
    try {
        const users = await getAllUser({ status: 'active', isMail: { $ne: 1 }});
        let result = users.map(async user => {
            const createdDate = new Date(user.createdAt);
            if (createdDate.getDate() == new Date(Date.now()).getDate() && user) {
                sendMail(user.email, 'Welcome Mail', `Hello ${user.username}, Welcome to my company.`);
                user.isMail = 1;
                await user.save();
                console.log('Mail send successfully after 5 seconds');
            }
        });
    } catch (error) {
        console.error('Error creating users:', error);
    }
}

let task = cron.schedule('*/5 * * * * *', cronJob);
// task.start();

module.exports = task;
