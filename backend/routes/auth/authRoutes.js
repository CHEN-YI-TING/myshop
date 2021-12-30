const { Router } = require("express");
const authController = require("../../controllers/auth/authControllers");

const authApi = Router();

authApi.get("/signup", authController.signup_get);
authApi.post("/signup", authController.signup_post);
authApi.get("/login", authController.login_get);
authApi.post("/login", authController.login_post);

module.exports = authApi;
