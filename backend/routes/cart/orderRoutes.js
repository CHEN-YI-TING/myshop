const { Router } = require("express");
const orderController = require("../../controllers/cart/orderController");
const orderItemController = require("../../controllers/cart/orderItemController");

const router = Router();
//order
router.get("/orders", orderController.getAll);
router.get("/details/:orderId", orderItemController.seeDetails);
router.post("/", orderController.createOrder);

module.exports = router;
