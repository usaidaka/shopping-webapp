const { Cart, Product, ShopOrder, OrderLine } = require("../../models");
const dayjs = require("dayjs");

const addShopOrder = async (req, res) => {
  const user_id = req.user.userId;
  const { user_address } = req.body;

  try {
    const cartResult = await Cart.findAll({
      where: { user_id: user_id },
      include: [Product],
    });

    if (!cartResult) {
      return res.status(400).json({
        ok: false,
        message: "you do not add any cart yet",
      });
    }

    if (!user_address) {
      return res.status(400).json({
        ok: false,
        message: "please input your address",
      });
    }

    let total = 0;
    for (const item of cartResult) {
      total += item.qty * item.Product.price;
    }

    const myOrder = await ShopOrder.create({
      user_id: user_id,
      order_date: dayjs(new Date()).format("YYYY-MM-DD"),
      order_total: total,
      address: user_address,
    });

    const mySoldProduct = await Product.findOne({
      where: { user_id: user_id },
    });

    let product = 0;
    for (const item of cartResult) {
      const myOrderLine = await OrderLine.create({
        order_id: myOrder.id,
        product_id: item.product_id,
      });
    }

    if (!myOrder) {
      return res.status(400).json({
        ok: false,
        message: "you have to checkout from checkout cart",
      });
    }

    res.status(201).json({
      ok: true,
      message: "payment successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const geyMyTransaction = async (req, res) => {
  const user_id = req.user.userId;
  // nge query untuk filter date
  const data = {
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  };

  try {
    // ngambil semua orderline buat cek my transaction
    const transaction = await ShopOrder.findAll({
      where: { user_id: user_id },
    });
    if (!transaction) {
      return res.json({
        ok: false,
        message: "user have not any order",
      });
    }
    let total = 0;
    for (const item of transaction) {
      total += item.order_total;
    }
    console.log(total);
    res.json({
      ok: true,
      data: total,
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
  addShopOrder,
  geyMyTransaction,
};
