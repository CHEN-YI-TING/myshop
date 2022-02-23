const { Router } = require("express");
const productController = require("../../controllers/cart/ProductController");
const getUserId = require("../../middleware/getUserId");
const validateToken = require("../../middleware/validateToken");

const router = Router();

router.get("/", getUserId, productController.getAllProducts);
router.get("/:productId", productController.productDetail);

//admin
router.post("/new", validateToken, productController.addProduct);
router.patch("/:productId", validateToken, productController.updateProduct);
router.delete("/:productId", validateToken, productController.deleteProduct);

module.exports = router;
