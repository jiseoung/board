const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const pool = require('../db_connect.service.js');

app.use('/uploads', express.static(__dirname + '/uploads'));

exports.write = async (username, title, content, file_name, secret) => {
    const connection = await pool.getConnection(async conn => conn);

    try {
        const [result] = await connection.execute(
            'INSERT into board (username, title, content, file_name, date, secret) values (?, ?, ?, ?, NOW(), ?)',
            [username, title, content, file_name, secret]
        );

        return result;
    } catch (e) {
        console.log('board_write error : ' + e);
    } finally {
        connection.release();
    }
}

exports.file_setting = multer({
    storage: multer.diskStorage({
        destination (req, file, done) {
            done(null, "uploads/");
        },
        filename (req, file, done) {
            file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
            const ext = path.extname(file.originalname);

            done(null, path.basename(file.originalname, ext) + ext);
        },
    }),
    limits: { fieldSize: 5 * 1024 * 1024 },
});

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