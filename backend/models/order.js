const { DataTypes } = require("sequelize");
const sequelize = require("../database/dbconfig");

const Order = sequelize.define(
  "order",
  {
    dataReceived: DataTypes.DATEONLY,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Order;
