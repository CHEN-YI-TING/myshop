const express = require("express");
const sequelize = require("./database/dbconfig");
const User = require("./models/user");

const app = express();
require("dotenv").config;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//api routes
//authRoute
const authRoutes = require("./routes/auth/authRoutes");
app.use("/", authRoutes);

const PORT = process.env.DB_PORT || 5000;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});

(async () => {
  await sequelize.sync({ alter: true });
})();
