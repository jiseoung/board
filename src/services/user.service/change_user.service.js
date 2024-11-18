const pool = require('../db_connect.service.js');
const jwt = require('../jwt.service.js');

exports.change_info = async (id, username, email, before_username) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'UPDATE users SET id = ?, username = ?, email = ? WHERE username = ?',
            [id, username, email, before_username]
        );

        await connection.execute(
            'UPDATE board SET username = ? WHERE username = ?',
            [username, before_username]
        );

        const [user] = await connection.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        )

        if (user) {
            const jwt_token = await jwt.generate_jwt({ username : user[0].username, role : user[0].role});

            return jwt_token;
        }
    } catch (e) {
        console.log('change_info error : ' + e);
    } finally {
        connection.release();
    }
}

exports.change_pw = async (req, res) => {
    const connection = await pool.getConnection(async conn => conn);

    try {

    } catch (e) {

    } finally {
        connection.release();
    }
}