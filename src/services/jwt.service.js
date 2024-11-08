const jwt = require('jsonwebtoken');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

exports.generate_jwt = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { algorithm: "HS256", expiresIn: '24h' });
    } catch (e) {
        console.log('generate_jwt error : ' + e);
    }
};

exports.verify_jwt = (token) => {
    try {
        const data = jwt.decode(token, process.env.JWT_SECRET_KEY);

        return data;
    } catch (e) {
        if (e.message === "jwt expired") {
            return "expired";
        } else {
            return "invalid";
        }
    }
        
};


