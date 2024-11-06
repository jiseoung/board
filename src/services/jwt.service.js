const jwt = require('jsonwebtoken');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

exports.generate_jwt = async (payload) => {
    const token = jwt.sign(payload, `${process.env.JWT_SERCRET_KEY}`, { algorithm: "HS256", expiresIn: '24h' });
        
    return token;
};

exports.verify_jwt = async (token) => {
    try {
        const data = jwt.decode(token, `${process.env.JWT_SERCRET_KEY}`);

        return data;
    } catch (e) {
        if (e.message === "jwt expired") {
            return "expired";
        } else {
            return "invalid";
        }
    }
        
};


