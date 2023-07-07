const routerCart = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const cartController = require("../controller/cart");

routerCart.post("/cart", verifyToken, cartController.addCart);
routerCart.get("/cart", verifyToken, cartController.getUserCart);
routerCart.delete("/cart/:id", verifyToken, cartController.cancelCart);

module.exports = routerCart;
