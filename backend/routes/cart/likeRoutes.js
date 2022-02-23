const express = require("express");
const router = express.Router();
const Like = require("../../models/like");
const User = require("../../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { productId } = req.body;
  try {
    const token = await req.cookies.jwt;
    if (!token) return res.status(401).send({ error: "401錯誤:未授權" });
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
      // delete like-->check if existed like?
      const existed = await Like.findOne({
        where: { productId: productId, userId: user.id },
      });
      if (!existed) {
        //create like
        const created = await Like.create({
          productId: productId,
          userId: user.id,
        });
        res.status(201).send({ created: true, message: "點讚成功，謝謝支持" });
      } else {
        await Like.destroy({
          where: {
            productId: productId,
            userId: user.id,
          },
        });
        res.status(201).send({ created: false, message: "你已經取消讚囉!" });
      }
    } else {
      res.status(404).send({ error: "404錯誤:沒有此使用者" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
