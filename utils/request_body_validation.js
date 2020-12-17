const { func } = require("joi");
const Joi = require("joi");

const schema = {
    "schemaRegister":  Joi.object().keys ({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(60).required()
    }),

    "schemaLogin": Joi.object().keys ({
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(60).required()
    }),

    "schemaUserId": Joi.object().keys ({ id: Joi.number().required() })
}



function validate(schemaType) {
    return (req, res, next) => {
        // check if schema type exists
        const matchedSchema = schema[schemaType];
        if (!matchedSchema) {
            console.log("invalid body schema to check. Go to utils/request+body_validation.js and fix !")
            return res.status(500).json({
                success: 0,
                data: "internal proble, check later"
            });
        }

        const schemaValidation = matchedSchema.validate(req.body);

        // send 500 for not obeying schema rules 
        if (schemaValidation.error) {
            return res.status(500).json({
                success: 0,
                data: schemaValidation.error.details[0].message
            });
        }

        // continue execution
        next();
    }    
}

module.exports = {
    validate
}