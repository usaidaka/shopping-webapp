const routerProduct = require("express").Router();
const productController = require("../controller/product");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/multerProduct");

routerProduct.get("/products", productController.getProducts);

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
routerProduct.get(
  "/products/user",
  verifyToken,
  productController.getUserProduct
);

routerProduct.get("/products/:id", productController.getProductById);
routerProduct.delete(
  "/products/:id",
  verifyToken,
  productController.deleteProduct
);

module.exports = routerProduct;
