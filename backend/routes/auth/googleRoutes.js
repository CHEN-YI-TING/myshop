const passport = require("passport");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const successLoginUrl = "http://localhost:3000/auth/login/google/success";
const errorLoginUrl = "http://localhost:3000/auth/login/google/error";

//google auth button request
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//if click ok -->render user request
//google strategy thing will be fire before this
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "無法登入google,請再試試看",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
    passReqToCallback: true,
  }),
  (req, res) => {
    //you can use jwt in here
    console.log("驗證完回傳的使用者資訊..........", req.user.id);
    const token = createToken(req.user.id);
    console.log("this is  ------------------------token", token);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: req.user });
  }
);

//createToken
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: maxAge });
};

router.get("/user", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "你尚未登入" });
  }
  const token = createToken(req.user.id);
  console.log("this is token", token);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: maxAge * 1000,
  });
  res.status(201).json({ user: req.user });
});

module.exports = router;
