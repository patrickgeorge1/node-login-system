const { response } = require("express");
const database_connection = require("../utils/db");


class UserRepository {
    constructor() {}
    
    async getUser(id) {
        let usersPromise = new Promise((resolve, reject) => {
            database_connection.query("select * from aiurea where id = ?", [id], (err, rows, fields)  => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
        let users = await usersPromise;
        return users;
    }
}

const user_repository = new UserRepository();

module.exports = { user_repository: user_repository }

