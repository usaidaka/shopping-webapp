"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: "user_id" });
      User.hasMany(models.ShopOrder, { foreignKey: "user_id" });
      User.hasOne(models.Cart, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, unique: true },
      email: { type: DataTypes.STRING, unique: true },
      phone: { type: DataTypes.STRING, unique: true },
      store_name: { type: DataTypes.STRING, unique: true },
      image_profile: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("imageURL");
          if (rawValue) {
            return `${process.env.BASEPATH}/${rawValue}`;
          }
          return null;
        },
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
