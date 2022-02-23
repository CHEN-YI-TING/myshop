const { DataTypes } = require("sequelize");
const sequelize = require("../database/dbconfig");

const Like = sequelize.define(
  "like",
  {},
  {
    freezeTableName: true,
  }
);

module.exports = Like;
