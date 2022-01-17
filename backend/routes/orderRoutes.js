const { Router } = require("express");
const orderController = require("../controllers/orderController");
const orderItemController = require("../controllers/orderItemController");

const router = Router();

router.get("/orders", orderController.getAll);
router.get("/details/:orderId", orderItemController.seeDetails);
router.post("/", orderController.createOrder);

module.exports = router;
