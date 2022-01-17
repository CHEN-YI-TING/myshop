const { DataTypes } = require("sequelize");
const sequelize = require("../database/dbconfig");

const OrderItem = sequelize.define(
  "orderItem",
  {
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.BIGINT,
  },
  {
    freezeTableName: true,
  }
);

module.exports = OrderItem;
