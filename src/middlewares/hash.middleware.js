const crypto = require('crypto');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

const salt = process.env.SALT;

exports.create_hash = async (pw) => {
    const hashed_pw = await crypto.pbkdf2Sync(pw, salt, 2302, 64, 'sha512').toString('base64');

    return hashed_pw;
}

