const { Router } = require("express");
const orderController = require("../../controllers/cart/orderController");
const orderItemController = require("../../controllers/cart/orderItemController");
const validateToken = require("../../middleware/validateToken");

const router = Router();
//user
router.get("/orders", validateToken, orderController.getAll);
router.get("/details/:orderId", validateToken, orderItemController.seeDetails);
router.post("/", validateToken, orderController.createOrder);

module.exports = router;
