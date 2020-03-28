const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASS_DB,
    database: 'educ_db'
});

connection.connect((err) => {
    if(!err) {
        console.log("Database is connected")
    } else {
        console.log("error connection database")
    }
})

module.exports = connection;