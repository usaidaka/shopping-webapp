const { Category } = require("../../models");

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    const dataCategory = await Category.findOne({
      where: {
        id: id,
      },
    });

    if (!dataCategory) {
      return res.status(400).json({
        ok: false,
        message: "you have not choose any category yet",
      });
    }

    const isCategoryExist = await Category.findOne({
      where: { category_name: category_name },
    });

    if (isCategoryExist) {
      return res.status(400).json({
        ok: false,
        message: "category already exist, please choose one",
      });
    }

    const updateCategory = await Category.update(
      { category_name: category_name },
      { where: { id: id } }
    );
    res.status(201).json({
      data: updateCategory,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const categoryData = await Category.findAll({});
    res.json({
      ok: true,
      result: categoryData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message || "fatal error",
    });
  }
};

module.exports = { editCategory, getCategory };
