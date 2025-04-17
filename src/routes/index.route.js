const express = require('express');

const router = express.Router();

const authRoute = require('./auth.route');
const taskRoute = require('./task.route');
const userRoute = require('./user.route');

router.use('/auth', authRoute);
router.use('/task', taskRoute);
router.use('/user', userRoute);

module.exports = router;