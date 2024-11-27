const pool = require('../db_connect.service.js');

exports.get_write = async (page) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [write] = await connection.execute(
            'SELECT * FROM board WHERE `index` = ?',
            [page]
        )

        return write;
    } catch (e) {
        console.log('board modify error : ' + e);
    } finally {
        connection.release();
    }
}

exports.modify = async (page, title, content, file_name, secret) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'UPDATE board set title = ?, content = ?, file_name = ?, secret = ? WHERE `index` = ?',
            [title, content, file_name, secret, page]
        );
    } catch (e) {
        console.log('board modify error : ' + e);
    } finally {
        connection.release();
    }
}

exports.secret_check = (secret) => {
    if (secret === 'secret') {
        return 1;
    }
    else {
        return 0;
    }
};

exports.file_check = (file) => {
    if (file === undefined) {
        return null;
    }
    else {
        return file.originalname;
    }
}