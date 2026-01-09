"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      OrderDetail.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      OrderDetail.belongsTo(models.OrderStatus, {
        foreignKey: "orderId",
        as: "status",
      });
    }
  }

  OrderDetail.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      productId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      trackingNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderDetail",
      tableName: "OrderDetails",
    }
  );

  return OrderDetail;
};
