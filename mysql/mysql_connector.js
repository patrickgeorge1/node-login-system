const { createConnection } = require("mysql");

const connection = createConnection({
    host: "lol-challange-database.cpr3gcaqegtw.eu-central-1.rds.amazonaws.com",
    user: "admin",
    password: "iliubipepatrick",
    database: "lolchallenge"
});

connection.connect(function(err) {
    if (err) throw err;
});


module.exports = connection;