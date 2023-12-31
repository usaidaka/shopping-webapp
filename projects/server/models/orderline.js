"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderLine.belongsTo(models.ShopOrder, { foreignKey: "order_id" });
      OrderLine.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }
  OrderLine.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: sequelize.NOW,
        get() {
          return new Date(this.getDataValue("createdAt"))
            .toISOString()
            .substring(0, 10);
        },
      },
    },
    {
      sequelize,
      modelName: "OrderLine",
    }
  );
  return OrderLine;
};
