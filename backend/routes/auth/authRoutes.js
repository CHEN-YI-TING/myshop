const { Router } = require("express");
const router = Router();
const authController = require("../../controllers/auth/authControllers");
const validateToken = require("../../middleware/validateToken");

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.get("/checkUser", authController.checkUser);
router.patch("/changePwd", validateToken, authController.updatePassword);

module.exports = router;
