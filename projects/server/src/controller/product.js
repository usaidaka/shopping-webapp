const { Product, User, Category, OrderLine, Cart } = require("../../models");
const db = require("../../models");

// error edit product belum ke catch di front end

const editProduct = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.userId;
  const data = JSON.parse(req.body.data);
  const imageURL = req.file.filename;

  try {
    const response = await Product.update(
      {
        name_item: data.name_item,
        user_id: user_id,
        category_id: data.category_id,
        product_description: data.product_description,
        image_product: `photo-product/${imageURL}`,
        price: data.price,
        status: data.status,
      },
      { where: { id: id, user_id: user_id } }
    );

    const result = await Product.findOne({
      where: { user_id: user_id, id: id },
      attributes: { exclude: ["product_id"] },
    });

    if (!result && response[0] === 0) {
      return res.status(400).json({
        ok: false,
        message: "you cannot edit someone's product",
      });
    }

    res.status(201).json({
      ok: true,
      data: result,
    });
  } catch (error) {
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
  try {
    if (!data) {
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
      return res.status(400).send({
        message: "user not found",
      });
    }

    //bisa bikin error handling untuk ngecek apakah category yang di input user exist

    const result = await Product.create({
      user_id: userData.id,
      category_id: Number(data.category_id),
      name_item: data.name_item,
      product_description: data.product_description,
      image_product: `photo-product/${imageURL}`,
      price: Number(data.price),
      status: data.status,
    });

    res.status(200).send({
      message: "success add a product",
      data: result,
    });
  } catch (error) {
    const data = JSON.parse(req.body.data);
    console.log(data);
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
      status: true
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
  const status = req.query.status === "true" 
  const user_id = req.user.userId;
  try {
    const result = await Product.findAll({
      where: { 
        user_id: user_id,
        status: status },
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
  console.log(id);
  try {
    const productData = await Product.destroy({
      where: { id: id, user_id: user_id },
    });
    if (!productData) {
      return res.status(400).json({
        ok: false,
        message: "you cannot delete someone's product",
      });
    }
    const isProductInCartExist = await Cart.findOne({
      where: { product_id: id },
    });

    if (isProductInCartExist) {
      await Cart.destroy({ where: { product_id: id, user_id: user_id } });
    }

    const isProductInOrderLine = await OrderLine.findOne({
      where: { product_id: id },
    });

    if (isProductInOrderLine) {
      await isProductInOrderLine.destroy({
        where: { product_id: id },
      });
    }

    res.status(200).json({
      ok: true,
      data: productData,
    });
  } catch (error) {
    console.log(error);
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
