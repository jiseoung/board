const pool = require('../db_connect.service.js');

exports.report = async (page) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'UPDATE board SET report = report+1 WHERE `index` = ?',
            [page]
        );
    } catch (e) {
        console.log('report error : ' + e);
    } finally {
        connection.release();
    }
}