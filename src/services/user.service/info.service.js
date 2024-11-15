const pool = require('../db_connect.service');

exports.parse_user = async (username) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [user] = await connection.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
            
        return user;
    } catch (e) {
        console.log('parse_user error : ' + e);
    } finally {
        connection.release();
    }
}