const { errorStatus } = require("../helpers/helper");
const User = require("../models/user.model");

const verifyRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.user.id });
            if (user && allowedRoles.includes(user.role)) {
                next();
            }else {
                errorStatus(res, 401, 'Access denied');
            }
        }catch(error) {
            errorStatus(res, 401, 'Internet server error');
        }
    }
}

module.exports = verifyRole;