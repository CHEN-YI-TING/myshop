const CartItem = require("../models/cart-item");
const Cart = require("../models/cart");
const User = require("../models/user");

const createCart = async (req, res, next) => {
  const cartId = req.header("cartId");
  const cart = await Cart.findAll({ where: { id: cartId } });
  try {
    if (cart.length === 0) {
      const cart = await Cart.create();
      res.status(200).json({
        cartId: cart.id,
      });
    } else {
      res.status(200).send(cart);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const addCart = async (req, res, next) => {
  const { productId, totalCount, cartId } = req.body;
  try {
    const cartItem = await CartItem.create({
      productId: productId,
      totalCount: totalCount,
      cartId: cartId,
    });
    console.log(cartItem);
    res.status(200).json(cartItem);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCart,
  createCart,
};
