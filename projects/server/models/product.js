"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: "user_id" });
      Product.belongsTo(models.Category, { foreignKey: "category_id" });
      Product.hasOne(models.OrderLine, { foreignKey: "product_id" });
      Product.belongsTo(models.Cart, { foreignKey: "product_id" });
    }
  }
  Product.init(
    {
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      name_item: DataTypes.STRING,
      product_description: DataTypes.STRING,
      image_product: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("image_product");
          if (rawValue) {
            return `${process.env.BASEPATH}/${rawValue}`;
          }
          return null;
        },
      },
      price: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
