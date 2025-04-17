const { getSingleUserById, getAllUser, getSingleUser } = require('../dbServices/user.dbService');
const { hashedPassword, rendomString } = require('../helpers/helper');
const { sendMail } = require('../config/mailer');
const User = require('../models/user.model');
const { exec } = require('child_process');

const getUsersService = async (req) => {
    const user = await getSingleUserById(req.user.id);
    if (user.role === 'admin') var users = await getAllUser({ createdBy: user.id }); 
    else users = await getAllUser({ _id: { $ne: user.id }, role: { $ne: 'super-admin' } });

    const baseUrl = process.env.BASE_URL;
    const updatedUsers = users.map(user => {
        user.profile_image = user.profile_image ? `${baseUrl}api/uploads/${user.profile_image}` : null;
        return user;
    });

    return updatedUsers;
}

const saveUserService = async (req) => {
    const { id, username, email, mobile_number, role, status } = req.body;
    if (id) {
        var user = await getSingleUserById(id);
        var message = 'User update successfully';
        var flag = 0;
    }else {
        var user = new User();
        user.createdBy = req.user.id;
        var message = `Please check this ${email} and set the password`;
        var flag = 1;
    }
    user.username = username;
    user.email = email;
    user.mobile_number = mobile_number;
    user.role = role ? role : 'user';
    user.status = status ? 'active' : 'inactive';
    if (flag) {
        let token = await rendomString();
        user.verifyToken = token;
        await sendMail(email, 'Set Password', 'You click following this link for set the password:', `<a href="${process.env.BASE_URL}/api/set/password/${token}">Set Password</a>`);
    }
    await user.save();

    return message;
}

const deleteUserService = async (req) => {
    const user = await User.findByIdAndDelete(req.body.id);
    if (!user) return false;

    return 'User delete successfully';
}

const setPasswordService = async (req) => {
    var { password, confirm_password } = req.body;  
    if (password != confirm_password) return 401;

    const user = await getSingleUser({ verifyToken: req.params.id });
    if (!user) return 404;
    
    user.password = await hashedPassword(password);
    user.verifyToken = null;
    await user.save();

    return 200;
}

const changeStatusService = async (req) => {
    const { id, status } = req.body;
    let user = await getSingleUserById(id);
    if (!user) return false; 
    user.status = status ? 'active' : 'inactive';
    await user.save(); 
    
    return 'Status update successfully';
}

const dbSeed = (req, res) => {
    exec('npm run seed', (error, stdout, stderr) => {
        if (error) {
            console.log(`Seeding error: ${error.message}`)
        }
        if (stderr) {
            console.log(`Stderr: ${stderr}`)
        }
        console.log(`success seeding database ${stdout}`)
    });
    return 'Seeding completed';
}

module.exports = { getUsersService, saveUserService, deleteUserService, setPasswordService, changeStatusService, dbSeed };