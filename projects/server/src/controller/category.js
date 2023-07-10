const { Category } = require("../../models");
const db = require("../../models");

const editCategory = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    const dataCategory = await Category.findOne({
      where: {
        id: id,
      },
    });

    if (!dataCategory) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "you have not choose any category yet",
      });
    }

    const isCategoryExist = await Category.findOne({
      where: { category_name: category_name },
    });

    if (isCategoryExist) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "category already exist, please choose one",
      });
    }

    const updateCategory = await Category.update(
      { category_name: category_name },
      { where: { id: id } },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json({
      data: updateCategory,
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Fatal Error",
    });
  }
};

const addCategory = async (req, res) => {
  const { category_name } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const isCategoryExist = await Category.findOne({
      where: { category_name: category_name },
    });

    if (isCategoryExist) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "category already exist, please choose one",
      });
    }

    const postCategory = await Category.create(
      {
        category_name: category_name,
      },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json({
      data: postCategory,
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Fatal Error",
    });
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

module.exports = { editCategory, getCategory, addCategory };
