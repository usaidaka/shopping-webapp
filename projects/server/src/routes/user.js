const routerUser = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const UserController = require("../controller/user");
const Validation = require("../validation");

routerUser.post(
  "/auth/register",
  Validation.registerValidation,
  Validation.runValidation,
  UserController.register
);
routerUser.post(
  "/auth/login",
  Validation.loginValidation,
  Validation.runValidation,
  UserController.login
);
routerUser.get(
  "/auth/user-data",
  verifyToken,
  UserController.getUserInformation
);

module.exports = routerUser;
