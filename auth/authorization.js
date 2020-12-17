


// check role 
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        let user = req.user;
        // TODO CHECK ROLE IN DB


        next();
    }
}




module.exports.checkRole = checkRole;