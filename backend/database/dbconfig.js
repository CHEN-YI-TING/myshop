const { Sequelize } = require("sequelize");

require("dotenv").config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: "mysql",
});

sequelize.sync();
//{ alter: true }
(async () => {
  try {
    await sequelize.authenticate();
    console.log("資料庫連結成功");
  } catch (err) {
    console.error("無法連結到資料庫", err);
  }
})();

module.exports = sequelize;
