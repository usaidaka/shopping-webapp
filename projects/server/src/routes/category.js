const routerCategory = require("express").Router();
const categoryController = require("../controller/category");

routerCategory.patch(
  "/profile/my-store/category/:id",
  categoryController.editCategory
);
routerCategory.get(
  "/profile/my-store/category",
  categoryController.getCategory
);

module.exports = routerCategory;
