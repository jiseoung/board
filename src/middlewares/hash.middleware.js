const crypto = require('crypto');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

const salt = process.env.SALT;

exports.create_hash = async (pw) => {
    const key = await crypto.pbkdf2Promise(pw, salt, 9812, 64, "sha512");
    const hashed_pw = key.toString("base64");

    return hashed_pw;
}

