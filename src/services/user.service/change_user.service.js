const pool = require('../db_connect.service.js');

const hash = require('../../middlewares/hash.middleware.js');
const match_pw = require('../../middlewares/match_pw.middleware.js');

exports.change_info = async (id, username, email, before_username) => {
    const connection = await pool.getConnection(async conn => conn);

    const [duplicate_id] = await connection.execute(
        'SELECT id FROM users WHERE id = ? AND username != ?',
        [id, before_username]
    )
    const [duplicate_username] = await connection.execute(
        'SELECT username FROM users WHERE username = ? AND username != ?',
        [username, before_username]
    )

    if (duplicate_id.length > 0) {
        return 'duplicate_id';
    }
    else if (duplicate_username.length > 0) {
        return 'duplicate_username';
    }

    try {
        await connection.execute(
            'UPDATE users SET id = ?, username = ?, email = ? WHERE username = ?',
            [id, username, email, before_username]
        );

        await connection.execute(
            'UPDATE board SET username = ? WHERE username = ?',
            [username, before_username]
        );

        await connection.execute(
            'UPDATE comment SET username = ? WHERE username = ?',
            [username, before_username]
        )

        await connection.execute(
            'UPDATE good_bad SET username = ? WHERE username = ?',
            [username, before_username]
        );

        await connection.execute(
            'UPDATE manage_view SET username = ? WHERE username = ?',
            [username, before_username]
        );

        return 'succeed';
    } catch (e) {
        console.log('change_info error : ' + e);
    } finally {
        connection.release();
    }
}

exports.change_pw = async (current_pw, change_pw, username) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const is_match = await match_pw.check(current_pw, username);

        if (is_match === 'match') {
            const hashed_change_pw = await hash.create_hash(change_pw);

            const change_pw_result = await connection.execute(
                'UPDATE users SET pw = ? WHERE username = ?',
                [hashed_change_pw, username]
            );

            if (change_pw_result) {
                return 'change';
            }
            else {
                return 'not_change';
            }
        }
        else if (is_match === 'not_match') {
            return 'not_change';
        }
    } catch (e) {
        console.log('change pw error : ' + e);
    } finally {
        connection.release();
    }
}