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

exports.withdraw_user = async (username) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'DELETE FROM users WHERE username = ?',
            [username]
        );

        await connection.execute(
            'DELETE FROM board WHERE username = ?',
            [username]
        );

        await connection.execute(
            'DELETE FROM comment WHERE username = ?',
            [username]
        );

        await connection.execute(
            'DELETE FROM good_bad WHERE username = ?',
            [username]
        );

        await connection.execute(
            'DELETE FROM manage_view WHERE username = ?',
            [username]
        );
    } catch (e) {
        console.log('withdraw_user error : ' + e);
    } finally {
        connection.release();
    }
}