const { User, Cart, Product } = require("../../models");

// bikin create data :
// 1. cara untuk mengirim product_id dari frontend
// 2. ngambil qty dari front end dari sebuah state ke BE
const addCart = async (req, res) => {
  const user_id = req.user.userId;
  const { product_id, qty } = req.body;

  try {
    const result = await Cart.create({
      user_id: user_id,
      product_id: product_id,
      qty: Number(qty),
    });
    res.status(201).json({
      ok: true,
      message: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = { addCart };
