const { saveTask, getTask, deleteTask, getNotification, test } = require('../controllers/task.controller.js');
const { taskValidation }  = require('../validations/task.validation');
const verifyToken = require('../middleware/verifyToken.js');
const verifyRole = require('../middleware/verifyRole.js');
const express = require('express');

const router = express.Router();

router.post('/save', saveTask);
router.post('/delete', verifyToken, verifyRole(['admin', 'super-admin', 'user']), deleteTask);

router.get('/get', getTask);
router.get('/notifications/:limit?', verifyToken, verifyRole(['admin', 'super-admin', 'user']), getNotification);

module.exports = router;