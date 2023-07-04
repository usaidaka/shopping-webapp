"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShopOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShopOrder.belongsTo(models.User, { foreignKey: "user_id" });
      ShopOrder.hasMany(models.OrderLine, { foreignKey: "order_id" });
    }
  }
  ShopOrder.init(
    {
      user_id: DataTypes.INTEGER,
      order_date: DataTypes.DATE,
      order_total: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ShopOrder",
    }
  );
  return ShopOrder;
};
