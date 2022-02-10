const { DataTypes } = require("sequelize");
const sequelize = require("../database/dbconfig");

const Order = sequelize.define(
  "order",
  {
    dataReceived: DataTypes.DATEONLY,
    totalPrice: DataTypes.DOUBLE,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Order;
