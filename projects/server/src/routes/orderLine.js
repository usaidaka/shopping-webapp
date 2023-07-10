const routerOrderLine = require("express").Router();
const orderline = require("../../models/orderline");
const orderLineController = require("../controller/orderLine");

// middle ware

const verifyToken = require("../middleware/verifyToken");

routerOrderLine.get(
  "/order-line",
  verifyToken,
  orderLineController.getOrderLine
);

routerOrderLine.get("/order-line/top-selling", orderLineController.topSelling);
routerOrderLine.get("/order-line/top-selling/:id", orderLineController.topSellingByCategory)

module.exports = routerOrderLine;
