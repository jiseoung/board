const jwt = require('jsonwebtoken');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

const jwt_key = process.env.JWT_SERCRET_KEY

class JWT {
    generate_jwt(payload) {
        const token = jwt.sign(payload, jwt_key, { algorithm: "HS256", expiresIn: '24h' });
        
        return token;
    };

    verify_jwt(token) {
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
        
    }
}

module.exports = JWT;