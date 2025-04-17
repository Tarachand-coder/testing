const { getSingleUserById, getSingleUser, authUpdate } = require('../dbServices/auth.dbService');
const { hashedPassword, rendomString } = require('../helpers/helper');
const Blacklist = require('../models/blacklist.model.js');
const { sendMail } = require('../config/mailer');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const registerService = async (req) => {
    try {
        req.body.password = await hashedPassword(req.body.password);
        req.body.profile_image = 'uploads/' + req.file.filename;
        req.body.status = 'active';
        const user = new User(req.body);
        await user.save();

        return 'User registered successfully';
    } catch (error) {
        throw new Error('Error in registering user: ' + error.message);
    }
}

const loginService = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return 'Email or password is invalid';

    const user = await getSingleUser({ email });
    if (!user) return 'User not found';
    if (user.status !== 'active') return 'User is inactive, please connect to admin';

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return 'Invalid credentials';

    const token = await new Promise((resolve, reject) => {
        jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });

    return [{'user': user, 'token': token}];
}

const profileService = async (req) => {
    const user = await getSingleUserById(req.user.id);
    if (!user) return false;
    user.profile_image = user.profile_image ? user.profile_image : null;

    return user;  
}

const logoutService = async (req, res) => {
    const accessToken = req.headers["authorization"];
    checkBlackListed = await Blacklist.findOne({ token : accessToken });
    if (checkBlackListed) return false;

    const newBlackList = new Blacklist({ token: accessToken });
    await newBlackList.save();
    res.setHeader('authorization', '');

    return 'Logged out';
}

const profileSaveService = async (req) => {
    const { username, email, mobile_number } = req.body;
    const user =  await getSingleUserById(req.user.id);
    user.username = username;
    user.email = email;
    user.mobile_number = mobile_number;
    user.profile_image = 'uploads/' + req.file.filename;
    user.save();

    return 'Profile update successfully';
}

const forgotPasswordService = async (req, res) => {
    const { email } = req.body;
    let token = await rendomString();
    const user = await authUpdate({ email: email },{ $set: { verifyToken: token }});
    if (!user) return false;

    return await sendMail(email, 'Forgot Password', 'You click following this link for forgot password:', `<a href="${process.env.BASE_URL}auth/set-password/${token}">Reset Password</a>`);
}

const resetPasswordService = async (req) => {
    const { password, confirm_password } = req.body;
    if (password !== confirm_password) return 400;
     
    const user = await authUpdate({ verifyToken: req.params.token }, { $set: { verifyToken: null, password: await hashedPassword(password) } });
    if (!user) return 401;

    return 200;
}

const authResetPasswordService = async (req) => {
    const { old_password, new_password, confirm_password } = req.body;
    if (new_password !== confirm_password) return 401;

    const user = await getSingleUserById(req.user.id);
    const comparePassword = await bcrypt.compare(old_password, user.password);

    if (!comparePassword) return 400;
    await authUpdate({ _id: req.user.id }, { $set: { password: await hashedPassword(new_password) }});

    return 200;
}

module.exports = { registerService, loginService, profileService, logoutService, profileSaveService, forgotPasswordService, resetPasswordService, authResetPasswordService };