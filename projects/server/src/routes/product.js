const routerProduct = require("express").Router();
const productController = require("../controller/product");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/multerProduct");

routerProduct.patch(
  "/profile/my-store/edit-product/:id",
  verifyToken,
  upload.single("file"),
  productController.editProduct
);

module.exports = routerProduct;
