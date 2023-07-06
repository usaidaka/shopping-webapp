const routerOrderShop = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const orderShopController = require("../controller/shopOrder");

routerOrderShop.post(
  "/order-shop",
  verifyToken,
  orderShopController.addOrderShop
);

module.exports = routerOrderShop;
