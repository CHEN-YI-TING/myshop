const express = require("express");
const router = express.Router();

const authApi = require("../routes/auth/authRoutes");
const googleApi = require("../routes/auth/googleRoutes");
const productApi = require("../routes/cart/ProductRoutes");
const orderApi = require("../routes/cart/orderRoutes");
const likeApi = require("../routes/cart/likeRoutes");
const stripeApi = require("../routes/cart/stripeRoutes");

//api v1 version
router.use("/auth", authApi);
router.use("/auth", googleApi);
router.use("/products", productApi);
router.use("/order", orderApi);
router.use("/like", likeApi);
router.use("/checkout", stripeApi);

module.exports = router;
