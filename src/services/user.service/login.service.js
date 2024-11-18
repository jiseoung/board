const pool = require('../db_connect.service.js');
const hash = require('../../middlewares/hash.middleware.js');
const jwt = require('../../services/jwt.service.js');

const user_login = async (id, pw) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const hased_pw = await hash.create_hash(pw);

        const [result] = await connection.execute(
            'SELECT username, role FROM users where id= ? and pw= ?',
            [id, hased_pw]
        );

        if (result) {
            const jwt_token = await jwt.generate_jwt({ username : result[0].username, role : result[0].role});
            
            return jwt_token;
        }
    } catch (e) {
        console.log('user_login error : ' + e);
    } finally {
        connection.release();
    }
}

module.exports = user_login;