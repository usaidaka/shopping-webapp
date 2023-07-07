const { OrderLine, ShopOrder, Product } = require("../../models");

const getOrderLine = async (req, res) => {
  const user_id = req.user.userId;

  try {
    const result = await OrderLine.findAll({
      include: [
        { model: Product, where: { user_id: user_id } },
        { model: ShopOrder },
      ],
    });

    let total = 0;
    for (const item of result) {
      console.log(item);
      console.log(item.ShopOrder.order_total);
      total += item.ShopOrder.order_total;
    }

    res.json({
      msg: "Test",
      data: result,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = { getOrderLine };
