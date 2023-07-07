const routerShopOrder = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const orderShopController = require("../controller/shopOrder");

routerShopOrder.post(
  "/order-shop",
  verifyToken,
  orderShopController.addShopOrder
);

routerShopOrder.get(
  "/order-shop",
  verifyToken,
  orderShopController.geyMyTransaction
);

module.exports = routerShopOrder;
