const express = require("express");
const sequelize = require("./database/dbconfig");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());

//api routes
const authRoutes = require("./routes/auth/authRoutes");
app.use("/auth", authRoutes);
const productRoutes = require("./routes/ProductRoutes");
app.use("/products", productRoutes);
const orderRoutes = require("./routes/orderRoutes");
app.use("/order", orderRoutes);

const PORT = process.env.DB_PORT || 5000;

//user && product
Product.belongsTo(User, {
  onDelete: "CASCADE",
  constraints: true,
});
User.hasMany(Product);

//
User.hasMany(Order, {
  onDelete: "cascade",
});
Order.belongsTo(User);

// order && product
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

(async () => {
  //{ alter: true }
  await sequelize
    .sync()
    .then((result) => {
      app.listen(PORT, () => {
        console.log(`listen on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
})();
