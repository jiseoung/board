const pool = require('../db_connect.service.js');
const hash = require('../../middlewares/hash.middleware.js');

const user_register = async (id, pw, username, email) => {
    const connection = await pool.getConnection(async conn => conn);
    const pw_reg = /^(?=.*[a-zA-Z])(?=.*[!@$%^*?])(?=.*[0-9]).{8,15}$/;
    const email_reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    
    if (!(pw_reg.test(pw)) && !(email_reg.test(email))) {
        return 'pw_and_email_not_match';
    }
    else if (!(pw_reg.test(pw))) {
        return 'pw_not_match';
    }
    else if (!(email_reg.test(email))) {
        return 'email_not_match';
    }

    const [duplicate_id] = await connection.execute(
        'SELECT id FROM users WHERE id = ?',
        [id]
    )
    const [duplicate_username] = await connection.execute(
        'SELECT username FROM users WHERE username = ?',
        [username]
    )

    if (duplicate_id.length > 0) {
        return 'duplicate_id';
    }
    else if (duplicate_username.length > 0) {
        return 'duplicate_username';
    }
    
    try {
        const hashed_pw = await hash.create_hash(pw);

        const [result] = await connection.execute(
            'INSERT into users (id, pw, username, email, role) values (?, ?, ?, ?, ?)',
            [id, hashed_pw, username, email, 0]
        );

        return result;
    } catch (e) {
        console.log('user_register error : ' + e);
    } finally {
        connection.release();
    }
}

module.exports = user_register;