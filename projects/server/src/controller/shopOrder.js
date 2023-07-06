const { Cart, Product } = require("../../models");

const addOrderShop = async (req, res) => {
  const user_id = req.user.id;

  const cartResult = await Cart.findAll({
    where: { user_id: user_id },
  });

  res.json({
    msg: cartResult,
  });
};

module.exports = {
  addOrderShop,
};
