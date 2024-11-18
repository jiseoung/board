const pool = require('../db_connect.service');
const jwt = require('../../services/jwt.service.js');

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

exports.withdraw_user = async (username) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'DELETE FROM users WHERE username = ?',
            [username]
        );
    } catch (e) {
        console.log('withdraw_user error : ' + e);
    } finally {
        connection.release();
    }
}