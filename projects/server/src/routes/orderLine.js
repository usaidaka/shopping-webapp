const routerOrderLine = require("express").Router();
const orderLineController = require("../controller/orderLine");

// middle ware

const verifyToken = require("../middleware/verifyToken");

routerOrderLine.get(
  "/order-line",
  verifyToken,
  orderLineController.getOrderLine
);

routerOrderLine.get("/order-line/top-selling", orderLineController.topSelling);

module.exports = routerOrderLine;
