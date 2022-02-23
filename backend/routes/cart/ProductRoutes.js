const { Router } = require("express");
const productController = require("../../controllers/cart/ProductController");
const getUserId = require("../../middleware/getUserId");

const router = Router();

router.get("/", getUserId, productController.getAllProducts);
router.get("/:productId", productController.productDetail);

//admin
router.post("/new", productController.addProduct);
router.patch("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
