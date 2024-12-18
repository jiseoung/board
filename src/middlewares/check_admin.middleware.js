const jwt = require('../services/jwt.service.js');

const check_admin = async (req, res, next) => {
    const jwt_token = req.cookies.jwt_token;
    
    if (!jwt_token) {
        res.status(403).render('403');
    }

    const role = await jwt.verify_jwt(jwt_token).role;

    if (role === 1) {
        next();
    }
    else {
        res.status(403).render('403');
    }
}

module.exports = check_admin;