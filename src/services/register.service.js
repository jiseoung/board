const connection = require('./db_connect.service.js');

const user_register = async(id, pw, username, email) => {
    try {
        const result = await connection.execute(
            'INSERT into users (id, pw, username, email, role) values (?, ?, ?, ?, ?)',
            [id, pw, username, email, 0]
        );

        return result;
    } catch (e) {
        console.log(e);
    }
}

module.exports = user_register;