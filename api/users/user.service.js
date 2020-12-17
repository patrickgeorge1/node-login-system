const { callbackify } = require("util");
const pool = require("../../utils/db");


module.exports = {
    createUser: (data, callBack) => {
        pool.query(
            `insert into users(email, password, name) values (?, ?, ?)`,
            [
                data.email,
                data.password,
                data.name,
            ],
            (error, results, fields) => { 
                if(error) { 
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByEmail: (data, callBack) => {
        pool.query(
            `select * from users where email = ?`,
            [data.email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getUserById: (data, callBack) => {
        pool.query(
            `select * from users where id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
};