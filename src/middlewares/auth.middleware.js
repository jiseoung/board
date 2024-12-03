const jwt = require('../services/jwt.service.js');

const auth = async (req, res, next) => {
    const jwt_token = req.cookies.jwt_token;

    if (jwt_token === undefined) {
        res.status(400).send('<script>alert("login first"); location.href="/user/login"; </script>');
    }

    try {
        const user = await jwt.verify_jwt(jwt_token);

        if (user === 'expired') {
            res.status(400).send('<script>alert("login again"); location.href="/user/login"; </script>');
        }
        else {
            next();
        }
    } catch (e) {
        console.log('auth error : ' + e);
    }
}

module.exports = auth;