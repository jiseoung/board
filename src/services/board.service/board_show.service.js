const pool = require('../db_connect.service.js');

exports.show_write = async (page_index) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [show_write_result] = await connection.execute(
            'SELECT * FROM board WHERE `index` = ?',
            [page_index]
        );

        return show_write_result;
    } catch (e) {
        console.log('show_write error : ' + e);
    } finally {
        connection.release();
    }    
}