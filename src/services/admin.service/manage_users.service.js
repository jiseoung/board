const pool = require('../db_connect.service.js');

exports.user_list = async () => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [user_list] = await connection.execute(
            'SELECT * FROM users WHERE role = 0'
        )

        return user_list;
    } catch (e) {
        console.log('user_list error : ' + e);
    } finally {
        connection.release();
    }
}