const router = require("express").Router();
const { checkToken } = require("../../auth/toke_validation");
const { checkRole } = require("../../auth/authorization");
const { getUserById } = require("./user.service");
const userController = require("./user.controller");


router.post("/login", userController.login);
router.post("/register", userController.createUser);
router.get("/users", checkToken, checkRole(["USER"]), userController.searchUser);

module.exports = router;