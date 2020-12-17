require("dotenv").config();
const { createUser, getUserByEmail, getUserById } = require("./user.service");
const {genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Joi = require("joi");

module.exports = {
    createUser: (req, res) => {
            // input validation
            const schema = Joi.object().keys ({
                name: Joi.string().min(3).max(50).required(),
                email: Joi.string().min(5).max(50).required(),
                password: Joi.string().min(5).max(60).required()
            });
            const schemaValidation = schema.validate(req.body);
            if (schemaValidation.error) {
                return res.status(400).json({
                    success: 0,
                    data: schemaValidation.error.details[0].message
                });
            }


            // hash the password
            const body = req.body;
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);

            // call service
            createUser(body, (err, result) => {
                if (err) {
                    // log
                    return res.status(500).json({
                        success: 0,
                        message: err.sqlMessage
                    });  // add logic using err if i want
                }
                return res.status(200).json({
                    success: 1,
                    data: body.email
                });
            });             
    },


    login: (req, res) => {
            // input validation
            const schema = Joi.object().keys ({
                email: Joi.string().min(5).max(50).required(),
                password: Joi.string().min(5).max(60).required()
            });

            const schemaValidation = schema.validate(req.body);
            if (schemaValidation.error) {
                return res.status(400).json({
                    success: 0,
                    data: schemaValidation.error.details[0].message
                });
            }


            // hash the password
            const body = req.body;

            // call service
            getUserByEmail(body, (err, result) => {
                if (err) {
                    // log
                    return res.status(500).json({
                        success: 0,
                        message: err.sqlMessage
                    });  // add logic using err if i want
                }
                if (!result) {
                    return res.status(400).json({
                        success: 0,
                        message: "email or password are wrong"
                    });
                }
                

                const compareRes = compareSync(body.password, result.password);
                if (compareRes) {
                    result.password = undefined;
                    const jwt = sign({ result: result }, process.env.JWT_SECRET, { expiresIn: "1h" });
              
                    return res.status(200).json({
                        success: 1,
                        message: "login successfully",
                        token: jwt
                    });  
                } else {
                    return res.status(400).json({
                        success: 0,
                        message: "email or password are wrong",
                    });  
                }

            });             
    },


    searchUser: (req, res) => {
            // input validation
            const schema = Joi.object().keys ({ id: Joi.number().required() });
            const schemaValidation = schema.validate(req.body);
            if (schemaValidation.error) {
                return res.status(400).json({
                    success: 0,
                    data: schemaValidation.error.details[0].message
                });
            }


            // hash the password
            const body = req.body;


            // call service
            getUserById(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: err.sqlMessage
                    });  // add logic using err if i want
                }
                return res.status(200).json({
                    success: 1,
                    message: result
                });
            });             
    }
}