const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASS_DB,
    database: 'educ_db'
})

module.exports = connection;