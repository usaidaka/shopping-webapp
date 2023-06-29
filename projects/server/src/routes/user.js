const routerUser = require("express").Router();
const UserController = require("../controller/user");

routerUser.post("/auth/register", UserController.register);
routerUser.post("/auth/login", UserController.login);

module.exports = routerUser;
