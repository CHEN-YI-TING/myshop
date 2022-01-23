const CartItem = require("../models/cart-item");
const Cart = require("../models/cart");
const User = require("../models/user");
const sequelize = require("../database/dbconfig");

const createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create();
    res.status(200).json({
      cartId: cart.id,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const addCart = async (req, res, next) => {
  const { productId, totalCount, cartId } = req.body;
  try {
    await CartItem.create({
      productId: productId,
      totalCount: totalCount,
      cartId: cartId,
    });
    CartItem.findAll({
      where: { productId: productId, cartId: cartId },
      attributes: [
        [sequelize.fn("SUM", sequelize.col("totalCount")), "totalCount"],
      ],
    }).then((data) => {
      data.forEach((count) => {
        const totalCount = count.toJSON();
        res.status(200).json({ productId, cartId, ...totalCount });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCart,
  createCart,
};
