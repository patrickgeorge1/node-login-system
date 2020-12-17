require("dotenv").config();
const { addUser, getUserByEmail, getUserById } = require("./user.service");
const { validateSchema } = require("../../utils/request_body_validation");
const {genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Joi = require("joi");


// look for user in db by id
const searchUser = (req, res) => {
    // get body message
    const body = req.body;

    // input validation
    const schemaValidation = validateSchema("schemaUserId", body);
    if (schemaValidation.success == 0) {
        return res.status(500).json({
            status: 0,
            message: schemaValidation.message
        });
    }

    // call service
    getUserById(body, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: err.sqlMessage
            });  // add logic using err if i want
        }
        result.password = undefined;
        return res.status(200).json({
            success: 1,
            message: result
        });
    });             
}

// check credentials and create JWT
const login = (req, res) => {
    // get body message
    const body = req.body;

    // input validation
    const schemaValidation = validateSchema("schemaLogin", body);
    if (schemaValidation.success == 0) {
        return res.status(500).json({
            status: 0,
            message: schemaValidation.message
        });
    }

    // look for user by email
    getUserByEmail(body, (err, result) => {
        // no user or db error => bad response
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
        
        
        // user found:  check user password
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
}

// register user in db
const createUser = (req, res) => {
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
    addUser(body, (err, result) => {
        if (err) {
            // log
            return res.status(500).json({
                success: 0,
                message: err.sqlMessage
            });  // add logic using err if i want
        }
        return res.status(200).json({
            success: 1,
            data: "success"
        });
    });             
}

exports.login = login;
exports.searchUser = searchUser;
exports.createUser = createUser;