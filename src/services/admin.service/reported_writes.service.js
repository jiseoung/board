const pool = require('../db_connect.service.js');

exports.list = async () => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [reported_writes_list] = await connection.execute(
            'SELECT * FROM board WHERE report > 0'
        )

        return reported_writes_list;
    } catch (e) {
        console.log('reported writes list error : ' + e);
    } finally {
        connection.release();
    }
}