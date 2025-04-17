const express = require('express');
const { saveUser, getUsers, deleteUser, setPassword, changeStatus, userSeed } = require('../controllers/user.controller');
const { userValidation }  = require('../validations/user.validation');
const verifyToken = require('../middleware/verifyToken.js');
const verifyRole = require('../middleware/verifyRole.js');

const router = express.Router();

router.post('/delete', verifyToken, verifyRole(['admin', 'super-admin']), deleteUser);
router.post('/set/password/:id', userValidation().setPassword, setPassword);
router.post('/status', userValidation().status, verifyToken, verifyRole(['admin', 'super-admin']), changeStatus);
router.post('/save', userValidation().saveUser, verifyToken, verifyRole(['admin', 'super-admin']), saveUser);

router.get('/get', verifyToken, verifyRole(['admin', 'super-admin']), getUsers);
router.get('/seed', verifyToken, verifyRole(['super-admin']), userSeed);

module.exports = router;