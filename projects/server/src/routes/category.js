const routerCategory = require("express").Router();
const categoryController = require("../controller/category");

// middle ware
const Validation = require("../validation");

routerCategory.patch(
  "/profile/my-store/category/:id",
  Validation.editCategoryValidation,
  Validation.runValidation,
  categoryController.editCategory
);
routerCategory.get(
  "/profile/my-store/category",
  categoryController.getCategory
);

module.exports = routerCategory;
