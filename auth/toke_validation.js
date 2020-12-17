const { verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");

        if(token) {
            token = token.slice(7);
            verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: 0,
                        data: "invalid token"
                    });
                } else {
                    next();
                }
            });

        } else {
            return res.status(401).json({
                success: 0,
                data: "token is missing"
            });
        }
    }
}