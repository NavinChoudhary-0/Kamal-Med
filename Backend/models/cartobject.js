"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartObject extends Model {
    static associate(models) {
      CartObject.belongsTo(models.User, { foreignKey: "userId" });
      CartObject.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }

  CartObject.init(
    {
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CartObject",
      tableName: "CartObject",
    }
  );

  return CartObject;
};
