const { errorStatus } = require('../helpers/helper.js');
const Blacklist = require('../models/blacklist.model.js');
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const accessToken = req.headers["authorization"];
    if (!accessToken) errorStatus(res, 401, 'Authorization failed. No access token.');

    const blacklist = await Blacklist.findOne({ token: accessToken });
    if (blacklist) errorStatus(res, 401, 'Token is expired please login');

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) errorStatus(res, 403, 'Could not verify token');
        req.user = user;
    });
    next();
}

module.exports = verifyToken;