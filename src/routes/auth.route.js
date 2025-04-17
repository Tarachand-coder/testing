const { register, login, profile, logout, profileSave, forgotPassword, resetPassword, authResetPassword } = require('../controllers/auth.controller.js');
const verifyToken = require('../middleware/verifyToken.js');
const { authValidation }  = require('../validations/auth.validation');
const upload = require('../middleware/upload.js');
const express = require('express');
const verifyRole = require('../middleware/verifyRole.js');
const router = express.Router();

router.post('/register', upload.uploadImg, authValidation().auth, register);
router.post('/login', login);
router.post('/profile/save', upload.uploadImg, verifyToken, profileSave);
router.post('/logout', verifyToken, logout);
router.post('/forgot-password', authValidation().forgotPassword, forgotPassword);
router.post('/set-password/:token', authValidation().resetPassword, resetPassword);
router.post('/reset-password', authValidation().authresetPassword, verifyToken, verifyRole(['admin', 'super-admin', 'user']), authResetPassword);

router.get('/profile', verifyToken, profile);

module.exports = router;