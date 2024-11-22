const jwt = require('../services/jwt.service.js');

const check_admin = async (req, res, next) => {
    const jwt_token = req.cookies.jwt_token;
    const role = await jwt.verify_jwt(jwt_token).role;

    if (role === 1) {
        next();
    }
    else {
        res.render('403');
    }
}

module.exports = check_admin;