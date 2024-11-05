const connection = require('../db_connect.service.js');
const hash = require('../../middlewares/hash.middleware.js');

const user_login = async (id, pw) => {
    try {
        const hased_pw = hash.create_hash(pw);

        const result = await connection.execute(
            'SELECT * FROM users where `id`= ? and `pw`= ?',
            [id, pw]
        );

        if (id === result[id] && hased_pw === result[pw]) {
            return result;
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = user_login;