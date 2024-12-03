const pool = require('../db_connect.service.js');
const hash = require('../../middlewares/hash.middleware.js');
const EMAIL = require('../send_email.service.js');

exports.reset_pw = async (id, username, mail_to_send) => {
    const connection = await pool.getConnection(async conn => conn);

    const [is_same] = await connection.execute(
        'SELECT * FROM users WHERE id = ? AND username = ? AND email = ?',
        [id, username, mail_to_send]
    )
    console.log(is_same[0]);
    if (!is_same[0]) {
        return 'error';
    }

    const rand_pw = Math.random().toString(36).slice(2);
    const email = new EMAIL(mail_to_send, "Reset Pw", "reset pw : " + rand_pw);
    const sended = await email.send_reset_pw_mail();

    if (sended) {
        const hashed_rand_pw = await hash.create_hash(rand_pw);

        try {
            await connection.execute(
                'UPDATE users SET pw = ? WHERE id = ? AND username = ?',
                [hashed_rand_pw, id, username]
            );

            return 'reset_complete';
        } catch (e) {
            console.log('reset_pw error : ' + e);
        } finally {
            connection.release();
        }
    }
}