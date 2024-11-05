const jwt = require('jsonwebtoken');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

const jwt_key = process.env.JWT_SERCRET_KEY;


exports.generate_jwt = async (payload) => {
    const token = jwt.sign(payload, jwt_key, { algorithm: "HS256", expiresIn: '24h' });
        
    return token;
};

exports.verify_jwt = async (token) => {
    try {
        const data = jwt.decode(token, jwt_key);

        return data;
    } catch (e) {
        if (e.message === "jwt expired") {
            return "expired";
        } else {
            return "invalid";
        }
    }
        
};


