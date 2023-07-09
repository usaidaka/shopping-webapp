const { Product, User, Category, OrderLine, Cart } = require("../../models");
const db = require("../../models");
const fs = require("fs");

const editProduct = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.userId;
  const data = JSON.parse(req.body.data);
  const t = await db.sequelize.transaction();
  try {
    const result = await Product.findOne({
      where: { user_id: user_id, id: id },
      attributes: { exclude: ["product_id"] },
    });

    const response = await Product.update(
      {
        name_item: data.name_item,
        user_id: user_id,
        category_id: data.category_id,
        product_description: data.product_description,
        price: data.price,
        status: data.status,
      },
      { where: { id: id, user_id: user_id } },
      { transaction: t }
    );

    if (req.file) {
      const newImage = req.file.filename;
      await Product.update(
        {
          image_product: `photo-product/${newImage}`,
        },
        { where: { id: id, user_id: user_id } },
        { transaction: t }
      );

      const realImageURL = result.getDataValue("image_product").split("/")[1];
      if (realImageURL) {
        fs.unlinkSync(`${__dirname}/../../Public/product/${realImageURL}`);
      }
    }

    if (!result && response[0] === 0) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "you cannot edit someone's product",
      });
    }

    const lastResult = await Product.findOne({
      where: { user_id: user_id, id: id },
      attributes: { exclude: ["product_id"] },
    });

    await t.commit();
    res.status(201).json({
      ok: true,
      data: lastResult,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  const data = JSON.parse(req.body.data);
  console.log("data", data);
  const imageURL = req.file.filename;
  const t = await db.sequelize.transaction();
  try {
    if (!data) {
      await t.rollback();
      return res.status(400).send({
        message: "data not found",
      });
    }

    const userData = await User.findOne({
      where: {
        username: req.user.username,
        email: req.user.email,
      },
    });

    if (!userData) {
      await t.rollback();
      return res.status(400).send({
        message: "user not found",
      });
    }

    const result = await Product.create(
      {
        user_id: userData.id,
        category_id: Number(data.category_id),
        name_item: data.name_item,
        product_description: data.product_description,
        image_product: `photo-product/${imageURL}`,
        price: Number(data.price),
        status: data.status,
      },
      { transaction: t }
    );

    await t.commit();
    res.status(200).send({
      message: "success add a product",
      data: result,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).send({
      message: "server error",
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  const pagination = {
    page: Number(req.query.page) || 1,
    perPage: 9,
    catId: req.query.category || undefined,
    search: req.query.search || undefined,
    sortBy: req.query.sortBy || "desc",
  };

  try {
    const where = {
      status: true,
    };
    if (pagination.search) {
      where.name_item = {
        [db.Sequelize.Op.like]: `%${pagination.search}%`,
      };
    }

    if (pagination.catId) {
      where.category_id = {
        [db.Sequelize.Op.like]: pagination.catId,
      };
    }

    const order = [];
    for (const sort in pagination.sortBy) {
      order.push([sort, pagination.sortBy[sort]]);
    }

    const result = await Product.findAll({
      attributes: {
        exclude: ["product_id"],
      },
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
        {
          model: OrderLine,
          attributes: ["product_id"],
        },
        {
          model: User,
          attributes: ["store_name"]
        }
      ],
      where,
      limit: pagination.perPage,
      offset: (pagination.page - 1) * pagination.perPage,
      order,
    });

    const totalProduct = await Product.count({ where });

    res.status(200).send({
      message: "success get products",
      pagination: {
        ...pagination,
        totalData: totalProduct,
      },
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findOne({
      where: { id: Number(id) },
      attributes: { exclude: ["product_id"] },
      include: [
        { 
          model: User,
          attributes: ["store_name"]
        }
      ]
    });

    if (!result) {
      return res.status(400).json({
        ok: false,
        message: "product not found",
      });
    }

    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const getUserProduct = async (req, res) => {
  const status = req.query.status === "true";
  const user_id = req.user.userId;
  try {
    const result = await Product.findAll({
      where: {
        user_id: user_id,
        status: status,
      },
      attributes: { exclude: ["product_id"] },
    });

    if (!result) {
      return res.status(400).json({
        ok: false,
        message: "your product not found",
      });
    }

    res.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const user_id = req.user.userId;
  const { id } = req.params;
  const t = await db.sequelize.transaction();

  try {
    const dataProduct = await Product.findOne({
      where: { id: id, user_id: user_id },
    });

    const productData = await Product.destroy(
      {
        where: { id: id, user_id: user_id },
      },
      { transaction: t }
    );
    if (!dataProduct) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "you cannot delete someone's product",
      });
    }
    if (!productData) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "your product has been deleted",
      });
    }
    const isProductInCartExist = await Cart.findOne({
      where: { product_id: id },
    });

    if (isProductInCartExist) {
      await Cart.destroy(
        { where: { product_id: id, user_id: user_id } },
        { transaction: t }
      );
    }

    const isProductInOrderLine = await OrderLine.findOne({
      where: { product_id: id },
    });

    if (isProductInOrderLine) {
      await isProductInOrderLine.destroy(
        {
          where: { product_id: id },
        },
        { transaction: t }
      );
    }

    const realImageURL = dataProduct
      .getDataValue("image_product")
      .split("/")[1];
    if (realImageURL) {
      fs.unlinkSync(`${__dirname}/../../Public/product/${realImageURL}`);
    }

    await t.commit();
    res.status(200).json({
      ok: true,
      data: productData,
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = {
  editProduct,
  createProduct,
  getProducts,
  getProductById,
  getUserProduct,
  deleteProduct,
};
