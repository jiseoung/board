const pool = require('../db_connect.service.js');

class Good_Bad {
    constructor (page, username) {
        this.page = page;
        this.username = username;
    }

    async click_check() {
        const connection = await pool.getConnection(async conn => conn);

        try {
            const [is_clicked] = await connection.execute(
                'SELECT * FROM good_bad WHERE board_index = ? AND username = ?',
                [this.page, this.username]
            );
    
            if (is_clicked[0] === undefined) {
                const good_and_bad = 'not';
                return good_and_bad;
            }
            if (is_clicked && is_clicked[0].good === 1) {
                const good_and_bad = 'good';
                return good_and_bad;
            }
            else if (is_clicked && is_clicked[0].bad === 1) {
                const good_and_bad = 'bad';
                return good_and_bad;
            }
        } catch (e) {
            console.log('click_check error : ' + e);
        } finally {
            connection.release();
        }
    }

    async click_reflection(click) {
        const connection = await pool.getConnection(async conn => conn);

        try {
            const [is_clicked] = await connection.execute(
                'SELECT * FROM good_bad WHERE board_index = ? AND username = ?',
                    [this.page, this.username]
            );

            if (click === 'good') {
                if(is_clicked[0] === undefined) {
                    await connection.execute(
                        'INSERT INTO good_bad (board_index, username, good) values (?, ?, ?)',
                        [this.page, this.username, 1]
                    );

                    await connection.execute(
                        'UPDATE board SET good = good+1 WHERE `index` = ?',
                        [this.page]
                    );
                }
                else if (is_clicked[0].good === 1) {
                    await connection.execute(
                        'DELETE FROM good_bad WHERE board_index = ? AND username = ?',
                        [this.page, this.username]
                    );

                    await connection.execute(
                        'UPDATE board SET good = good-1 WHERE `index` = ?',
                        [this.page]
                    );
                }
                else if (is_clicked[0].bad === 1) {
                    await connection.execute(
                        'UPDATE good_bad SET good = ?, bad = ? WHERE board_index = ? AND username = ?',
                        [1, 0, this.page, this.username]
                    );

                    await connection.execute(
                        'UPDATE board SET good = good+1, bad = bad-1 WHERE `index` = ?',
                        [this.page]
                    );
                }
            } 
            else if (click === 'bad') {
                if(is_clicked[0] === undefined) {
                    await connection.execute(
                        'INSERT INTO good_bad (board_index, username, bad) values (?, ?, ?)',
                        [this.page, this.username, 1]
                    );

                    await connection.execute(
                        'UPDATE board SET bad = bad+1 WHERE `index` = ?',
                        [this.page]
                    );
                }
                else if (is_clicked[0].bad === 1) {
                    await connection.execute(
                        'DELETE FROM good_bad WHERE board_index = ? AND username = ?',
                        [this.page, this.username]
                    );

                    await connection.execute(
                        'UPDATE board SET bad = bad-1 WHERE `index` = ?',
                        [this.page]
                    );
                }
                else if (is_clicked[0].good === 1) {
                    await connection.execute(
                        'UPDATE good_bad SET good = ?, bad = ? WHERE board_index = ? AND username = ?',
                        [0, 1, this.page, this.username]
                    );

                    await connection.execute(
                        'UPDATE board SET good = good-1, bad = bad+1 WHERE `index` = ?',
                        [this.page]
                    );
                }
            }
        } catch (e) {
            console.log('click_reflection error : ' + e);
        } finally {
            connection.release();
        }
    }
}

module.exports = Good_Bad;