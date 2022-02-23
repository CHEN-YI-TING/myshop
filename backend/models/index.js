const User = require("./user");
const Product = require("./product");
const Order = require("./order");
const OrderItem = require("./order-item");
const sequelize = require("../database/dbconfig");

//user && product
User.hasMany(Product);
Product.belongsTo(User, {
  onDelete: "CASCADE",
  constraints: true,
});

Order.belongsTo(User);
User.hasMany(Order, {
  onDelete: "cascade",
});

// order && product
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

//{ force: true }
(async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync();
    console.log("資料庫連結成功");
  } catch (err) {
    console.error("無法連結到資料庫", err);
  }
})();
