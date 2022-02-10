const CartItem = require("../models/cart-item");
const Cart = require("../models/cart");
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
      where: { cartId: cartId },
      attributes: [
        "productId",
        [sequelize.fn("SUM", sequelize.col("totalCount")), "totalCount"],
      ],
      group: "productId",
    }).then((cartItems) => {
      if (cartItems.length === 0) {
        return res.status(200).json("沒有要結帳的東西");
      } else {
        console.log(JSON.stringify(cartItems));
        console.log(JSON.stringify(cartItems.productId));
        return res.status(200).send(cartItems);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCart,
  createCart,
};
