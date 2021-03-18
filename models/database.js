const mysql = require('mysql2');
const databaseConfig = require('../config/db.config');

const connection = mysql.createConnection(
{
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.database
});

connection.connect(function(error)
{
    if(error) throw error;
});

module.exports = connection;