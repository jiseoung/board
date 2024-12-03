const pool = require('../db_connect.service.js');

exports.delete_write = async (page, jwt_username, role) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [[{ 'username': comment_username }]] = await connection.execute(
            'SELECT username FROM board WHERE `index` = ?',
            [page]
        )

        if (jwt_username === comment_username || role === 1) {
            await connection.execute(
                'DELETE FROM board WHERE `index` = ?',
                [page]
            )

            return 'succeed';
        }
        else {
            return 'fail';
        }

    } catch (e) {
        console.log('delete write error : ' + e);
    } finally {
        connection.release();
    }
}