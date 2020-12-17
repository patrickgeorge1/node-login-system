const { createUser, login, searchUser } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/toke_validation");
const { getUserById } = require("./user.service");

router.post("/users", checkToken,  createUser);
router.get("/users", checkToken,  searchUser);
router.post("/login", login);

module.exports = router;