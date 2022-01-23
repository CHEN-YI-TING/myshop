const { Router } = require("express");
const orderController = require("../controllers/orderController");
const orderItemController = require("../controllers/orderItemController");
const cartItemController = require("../controllers/cartItemController");
const cartController = require("../controllers/cartController");

const router = Router();
//order
router.get("/orders", orderController.getAll);
router.get("/details/:orderId", orderItemController.seeDetails);
router.post("/", orderController.createOrder);
//cart
router.get("/getAll", cartItemController.getAllCartItem);
router.post("/add", cartController.addCart);
router.post("/cart", cartController.createCart);
router.delete("/delete", cartItemController.deleteCartItem);

module.exports = router;
