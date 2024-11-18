const mysql = require('mysql2/promise');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

const mysql_host = process.env.MYSQL_HOST;
const mysql_username = process.env.MYSQL_USERNAME;
const mysql_password = process.env.MYSQL_PASSWORD;
const mysql_db = process.env.MYSQL_DATABASE;

const pool = mysql.createPool({
    host : mysql_host,
    user : mysql_username,
    password : mysql_password,
    database : mysql_db,
    connectionLimit : 6,
    dateStrings: 'date',
    waitForConnections: true,
    queueLimit: 0,
});

module.exports = pool;