const express = require("express");
const router = express.Router();
const Like = require("../../models/like");
const validateToken = require("../../middleware/validateToken");

router.post("/", validateToken, async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;
  try {
    // delete like-->check if existed like?
    const existed = await Like.findOne({
      where: { productId: productId, userId: userId },
    });
    if (!existed) {
      //create like
      const created = await Like.create({
        productId: productId,
        userId: userId,
      });
      res.status(201).send({ created: true, message: "點讚成功，謝謝支持" });
    } else {
      await Like.destroy({
        where: {
          productId: productId,
          userId: userId,
        },
      });
      res.status(201).send({ created: false, message: "你已經取消讚囉!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
