const pool = require('../db_connect.service.js');

exports.secret_check = (secret) => {
    if (secret === 'secret') {
        return 1;
    }
    else {
        return 0;
    }
};

exports.leave_comment = async (page, username, comment, secret) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'INSERT INTO comment (board_index, username, content, date, secret) VALUES (?, ?, ?, NOW(), ?)',
            [page, username, comment, secret]
        )
    } catch (e) {
        console.log('leave comment error : ' + e);
    } finally {
        connection.release();
    }
}

exports.leave_reply = async (page, parent_index, username, reply, secret) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [[{ 'depth': parent_com_depth }]] = await connection.execute(
            'SELECT depth FROM comment WHERE com_index = ?',
            [parent_index]
        )

        await connection.execute(
            'INSERT INTO comment (board_index, parent_index, depth, username, content, date, secret) VALUES (?, ?, ?, ?, ?, NOW(), ?)',
            [page, parent_index, parent_com_depth + 1, username, reply, secret]
        )
    } catch (e) {
        console.log('leave reply error : ' + e);
    } finally {
        connection.release();
    }
}

exports.show_comment = async (page) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const CTE = '\
            WITH RECURSIVE comment_tree AS (\
                SELECT \
                    com_index,\
                    board_index,\
                    parent_index,\
                    depth,\
                    username,\
                    content,\
                    date,\
                    secret,\
                    edit,\
                    CAST(com_index AS CHAR(255)) AS path \
                FROM comment\
                WHERE parent_index IS NULL AND board_index = ?\
                \
                UNION ALL\
                \
                SELECT \
                    c.com_index,\
                    c.board_index,\
                    c.parent_index,\
                    c.depth,\
                    c.username,\
                    c.content,\
                    c.date,\
                    c.secret,\
                    c.edit,\
                    CONCAT(ct.path, ",", c.com_index) AS path \
                FROM comment c\
                INNER JOIN comment_tree ct ON c.parent_index = ct.com_index\
            )\
            '
        const query = 'SELECT * FROM comment_tree ORDER BY path, date'
        const [comment] = await connection.execute(
            CTE + query,
            [page]
        )

        return comment;
    } catch (e) {
        console.log('show comment error : ' + e);
    } finally {
        connection.release();
    }
}

exports.edit_comment = async (com_index, content, secret) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'UPDATE comment SET content = ?, date = NOW(), secret = ?, edit = ? WHERE com_index = ?',
            [content, secret, 1, com_index]
        )
    } catch (e) {
        console.log('edit comment error : ' + e);
    } finally {
        connection.release();
    }
}

exports.delete_comment = async (com_index) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        await connection.execute(
            'DELETE FROM comment WHERE com_index = ?',
            [com_index]
        )
    } catch (e) {
        console.log('delete comment error : ' + e);
    } finally {
        connection.release();
    }
}
