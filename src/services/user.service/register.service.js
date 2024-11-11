const pool = require('../db_connect.service.js');
const hash = require('../../middlewares/hash.middleware.js');

const user_register = async (id, pw, username, email) => {
    const connection = pool.getConnection(async conn => conn);

    try {
        const hashed_pw = await hash.create_hash(pw);

        const result = await connection.execute(
            'INSERT into users (id, pw, username, email, role) values (?, ?, ?, ?, ?)',
            [id, hashed_pw, username, email, 0]
        );

        return result;
    } catch (e) {
        console.log('user_register error : ' + e);
    } finally {
        connection.release();
    }
}

module.exports = user_register;