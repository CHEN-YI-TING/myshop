const User = require("./user");
const Product = require("./product");
const Order = require("./order");
const OrderItem = require("./order-item");

module.exports = () => {
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
};
