const { createPool } = require("mysql");
require("dotenv").config();

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});

// pool.getConnection(function(err) {
//     if (err) throw err;
// });


module.exports = pool;