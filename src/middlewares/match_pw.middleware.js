const pool = require('../services/db_connect.service.js');
const hash = require('./hash.middleware.js');

exports.check = async (current_pw, username) => {
    const hashed_current_pw = await hash.create_hash(current_pw);
    const connection = await pool.getConnection(async conn => conn);
    
    try {
        const [in_db_pw] = await connection.execute(
            'SELECT pw FROM users WHERE username = ?',
            [username]
        );

        if (in_db_pw[0].pw === hashed_current_pw) {
            return 'match';
        }
        else {
            return 'not_match';
        }
    } catch (e) {
        console.log('match_pw error : ' + e);
    } finally {
        connection.release();
    }
}