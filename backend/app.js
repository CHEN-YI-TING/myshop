const express = require("express");
const sequelize = require("./database/dbconfig");
const User = require("./models/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

//api routes
const authRoutes = require("./routes/auth/authRoutes");
app.use("/auth", authRoutes);

const PORT = process.env.DB_PORT || 5000;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});

(async () => {
  await sequelize.sync();
})();
