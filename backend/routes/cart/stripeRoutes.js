const express = require("express");
const router = express.Router();
const stripeControllers = require("../../controllers/cart/stripeControllers");

router.post("/", stripeControllers.createCheckoutSession);

module.exports = router;
