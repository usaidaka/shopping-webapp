const { Product, User, Category } = require("../../models");
const db = require("../../models");

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
      { where: { id: id } }
    );
    res.status(201).json({
      ok: true,
      data: response,
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
  console.log("img", imageURL);
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
    sortBy: req.query.sortBy,
  };

  try {
    const where = {};
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
      include: [
        {
          model: Category,
          attributes: ["category_name"],
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
    const result = await Product.findOne({ where: { id: id } });
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
module.exports = { editProduct, createProduct, getProducts, getProductById };
