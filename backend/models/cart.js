const { DataTypes } = require("sequelize");
const sequelize = require("../database/dbconfig");

const Cart = sequelize.define(
  "cart",
  {},
  {
    freezeTableName: true,
  }
);

module.exports = Cart;
