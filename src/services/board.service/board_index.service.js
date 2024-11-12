const pool = require('../db_connect.service.js');

exports.show_writes_list = async () => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [writes_list] = await connection.execute(
            'SELECT * FROM board', []
        );

        return writes_list;
    } catch (e) {
        console.log('board error : ' + e);
    } finally {
        connection.release();
    }
};