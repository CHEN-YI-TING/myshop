const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = await req.cookies.jwt;
  if (!token) return res.status(401).send({ error: "401錯誤:未授權" });
  try {
    const userId = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (error, decodedToken) => {
        if (error) return res.status(400).send(error);
        return decodedToken.id;
      }
    );
    let user = await User.findByPk(userId);
    if (user) {
      req.userId = user.id;
      next();
    } else {
      res.status(404).send({ error: "404錯誤:沒有此使用者" });
    }
  } catch (error) {
    console.log(error);
  }
};
