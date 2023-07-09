const { Cart, Product, ShopOrder, OrderLine } = require("../../models");
const db = require("../../models");
const dayjs = require("dayjs");

const addShopOrder = async (req, res) => {
  const user_id = req.user.userId;
  const { user_address } = req.body;
  const t = await db.sequelize.transaction();

  try {
    const cartResult = await Cart.findAll({
      where: { user_id: user_id },
      include: [Product],
    });

    if (!cartResult) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "you do not add any cart yet",
      });
    }

    if (!user_address) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "please input your address",
      });
    }

    let total = 0;
    for (const item of cartResult) {
      total += item.qty * item.Product.price;
    }

    const myOrder = await ShopOrder.create(
      {
        user_id: user_id,
        order_date: dayjs(new Date()).format("YYYY-MM-DD"),
        order_total: total,
        address: user_address,
      },
      { transaction: t }
    );

    for (const item of cartResult) {
      for (let i = 1; i <= item.qty; i++) {
        await OrderLine.create(
          {
            order_id: myOrder.id,
            product_id: item.product_id,
          },
          { transaction: t }
        );
      }
    }

    await Cart.destroy({ where: { user_id: user_id } }, { transaction: t });

    if (!myOrder) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "you have to checkout from checkout cart",
      });
    }

    await t.commit();
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
  const currentDate = dayjs();
  const sevenDaysPrior = currentDate.subtract(7, "day").format("YYYY-MM-DD");
  const currentDatePlus1 = currentDate.add(1, "day").format("YYYY-MM-DD");
  const startDate = req.query.startDate
    ? (req.query.startDate = dayjs(req.query.startDate).format("YYYY-MM-DD"))
    : sevenDaysPrior;
  const endDate = req.query.endDate
    ? (req.query.endDate = dayjs(req.query.endDate).format("YYYY-MM-DD"))
    : currentDatePlus1;
  console.log(startDate);
  console.log(endDate);

  try {
    // ngambil semua orderline buat cek my transaction
    const transaction = await ShopOrder.findAll({
      where: {
        user_id: user_id,
        createdAt: {
          [db.Sequelize.Op.between]: [startDate, endDate],
        },
      },
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
      result: transaction,
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
