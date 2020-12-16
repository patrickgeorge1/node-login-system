const { response } = require("express");
const database_connection = require("../mysql/mysql_connector");


class UserRepository {
    constructor() {}
    
    getUser(id) {
        return new Promise((resolve, reject) => {
            database_connection.query("select * from users where id = ?", [id], (err, rows, fields)  => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        })
    }
}

const user_repository = new UserRepository();

module.exports = { user_repository: user_repository }

