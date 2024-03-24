const mysql = require("mysql")

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '25462510',
    database: 'vacCenter'
});

module.exports = connection;