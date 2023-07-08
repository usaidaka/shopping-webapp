const { OrderLine, ShopOrder, Product } = require("../../models");
const db = require("../../models");
const dayjs = require("dayjs");

const getOrderLine = async (req, res) => {
  const user_id = req.user.userId;
  const currentDate = dayjs();
  const sevenDaysPrior = currentDate.subtract(7, "day").format("YYYY-MM-DD");
  const currentDatePlus1 = currentDate.add(1, "day").format("YYYY-MM-DD");
  const startDate =
    req.query.startDate ? req.query.startDate = dayjs(req.query.startDate).format("YYYY-MM-DD") : sevenDaysPrior;
  const endDate = req.query.endDate ? req.query.endDate = dayjs(req.query.endDate).format("YYYY-MM-DD") : currentDatePlus1;
  console.log(startDate);
  console.log(endDate);

  try {
    const result = await OrderLine.findAll({
      include: [
        { model: Product, where: { user_id: user_id } },
        {
          model: ShopOrder,
          where: {
            createdAt: {
              [db.Sequelize.Op.between]: [startDate, endDate],
            },
          },
        },
      ],
    });

    let total = 0;
    for (const item of result) {
      total += item.Product.price;
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

const topSelling = async (req, res) => {
  try {
    const resultTopSelling = await OrderLine.findAll({
      include: [Product],
      attributes: [
        "product_id",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("product_id")), "count"],
      ],
      group: ["product_id"],
      order: [
        [db.Sequelize.fn("COUNT", db.Sequelize.col("product_id")), "DESC"],
      ],
      limit: 5,
    });
    res.json({
      ok: true,
      data: resultTopSelling,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = { getOrderLine, topSelling };
