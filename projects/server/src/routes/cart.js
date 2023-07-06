const routerCart = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const cartController = require("../controller/cart");

routerCart.post("/cart", verifyToken, cartController.addCart);

module.exports = routerCart;
