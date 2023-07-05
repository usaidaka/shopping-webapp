const routerProduct = require("express").Router();
const productController = require("../controller/product");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/multerProduct");

routerProduct.patch(
  "/product/edit-product/:id",
  verifyToken,
  upload.single("file"),
  productController.editProduct
);

routerProduct.post(
  "/product",
  verifyToken,
  upload.single("file"),
  productController.createProduct
);

routerProduct.get("/products/:id", productController.getProductById);

routerProduct.get("/products", productController.getProducts);

module.exports = routerProduct;
