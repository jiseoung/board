const pool = require('../db_connect.service.js');

exports.delete_write = async (page) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'DELETE FROM board WHERE `index` = ?',
            [page]
        )
    } catch (e) {
        console.log('delete write error : ' + e);
    } finally {
        connection.release();
    }
}