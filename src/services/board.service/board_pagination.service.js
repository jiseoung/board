const pool = require('../db_connect.service.js');

exports.pagination = async (page_index) => {
    const list_size = 10;
    const skip_size = (page_index - 1) * list_size;

    const connection = await pool.getConnection(async conn => conn);

    try {
        const [[{ 'count': total_writes }]] = await connection.execute(
            'SELECT count(*) as count FROM board'
        )
        
        const total_page = Math.ceil(total_writes / list_size);

        const [writes_list] = await connection.execute(
            'SELECT * FROM board ORDER BY `index` desc limit ' + skip_size + ',' + list_size,
        );

        return { total_page, writes_list };
    } catch (e) {
        console.log('pagination error : ' + e);
    } finally {
        connection.release();
    }
}