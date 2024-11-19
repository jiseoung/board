const pool = require('../services/db_connect.service.js');

exports.reset = async () => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'DELETE FROM manage_view'
        )
    } catch (e) {
        console.log('manage_view reset error : ' + e);
    } finally {
        connection.release();
    }
}

exports.viewed_before = async (board_index, username) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [is_viewed] = await connection.execute(
            'SELECT * FROM manage_view WHERE board_index = ? AND username = ?',
            [board_index, username]
        );

        if (is_viewed[0]) {
            return true;
        }
        else {
            return false;
        }
    } catch (e) {
        console.log('viewed_before error : ' + e);
    } finally {
        connection.release();
    }
}

exports.increase_view = async (board_index, username) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'UPDATE board SET view = view+1 WHERE `index` = ?',
            [board_index] 
        )

        await connection.execute(
            'INSERT INTO manage_view (`board_index`, `username`) values (?, ?)',
            [board_index, username]
        )
    } catch (e) {
        console.log('increase_view error : ' + e);
    } finally {
        connection.release();
    }
}