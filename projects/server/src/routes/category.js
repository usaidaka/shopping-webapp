const routerCategory = require("express").Router();
const categoryController = require("../controller/category");

// middle ware
const Validation = require("../validation");

routerCategory.patch(
  "/category/:id",
  Validation.editCategoryValidation,
  Validation.runValidation,
  categoryController.editCategory
);
routerCategory.get("/category", categoryController.getCategory);

routerCategory.post("/category", categoryController.addCategory);

module.exports = routerCategory;
