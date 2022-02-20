const { Router } = require("express");
const authController = require("../../controllers/auth/authControllers");

const router = Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.get("/checkUser", authController.checkUser);
// router.get("/checkAdmin",authController.checkAdmin);

module.exports = router;
