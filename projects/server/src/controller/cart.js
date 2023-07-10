const { User, Cart, Product } = require("../../models");
const db = require("../../models")

const addCart = async (req, res) => {
  const user_id = req.user.userId;
  const { product_id, qty } = req.body;
  const t = await db.sequelize.transaction();

  try {
    const isCartExist = await Cart.findOne({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });

    if (isCartExist) {
      const updateExistingCart = await Cart.update(
        {
          user_id: user_id,
          product_id: product_id,
          qty: Number(qty),
        },
        { where: { user_id: user_id, product_id: product_id } },
        { transaction: t }
      );
      await t.commit();
      return res.status(201).json({
        ok: true,
        message:
          "you have been added this product to cart, your request will be updating the existing cart",
        data: updateExistingCart,
      });
    }

    const result = await Cart.create(
      {
        user_id: user_id,
        product_id: product_id,
        qty: Number(qty),
      },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json({
      ok: true,
      message: "add to cart successfully",
      data: result,
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const getUserCart = async (req, res) => {
  const user_id = req.user.userId;

  try {
    const result = await Cart.findAll({
      where: { user_id: user_id },
      include: [Product],
    });

    let total = 0;
    for (const item of result) {
      total += item.Product.price * item.qty;
    }

    res.json({
      ok: true,
      message: result,
      total,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      message: error.message,
    });
  }
};

const cancelCart = async (req, res) => {
  const user_id = req.user.userId;
  const { id } = req.params;
  const t = await db.sequelize.transaction();
  try {
    const cartData = await Cart.destroy(
      {
        where: { id: id, user_id: user_id },
      },
      { transaction: t }
    );
    if (!id) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "product cart not found",
      });
    }

    if (!user_id) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "user not found",
      });
    }

    if (!cartData) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "you cannot delete someone's cart",
      });
    }

    await t.commit();
    res.status(200).json({
      ok: true,
      data: cartData,
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = { addCart, getUserCart, cancelCart };
