const sequelize = require("sequelize");
const CartItem = require("../models/cart-item");
const Product = require("../models/product");

const getAllCartItem = async (req, res, next) => {
  const cartId = req.header("cartId");
  //const { cartId } = req.body;
  try {
    await CartItem.findAll({
      include: [Product],
      where: { cartId: cartId },
      attributes: [
        "productId",
        [sequelize.fn("SUM", sequelize.col("totalCount")), "totalCount"],
      ],
      group: "productId",
    }).then((cartItems) => {
      if (cartItems.length === 0) {
        return res.status(200).json(cartItems);
      } else {
        return res.status(200).send(cartItems);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  const { productId } = req.body;
  const cartId = req.header("cartId");
  try {
     await CartItem.destroy({
      where: { cartId: cartId, productId: productId },
    });  
     CartItem.findAll({
      include: [Product],
      where: { cartId: cartId },
      attributes: [
        "productId",
        [sequelize.fn("SUM", sequelize.col("totalCount")), "totalCount"],
      ],
      group: "productId",
    }).then((cartItems) => {
      if (cartItems.length === 0) {
        return res.status(200).send(cartItems);
      } else {
        return res.status(200).send(cartItems);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCartItem,
  deleteCartItem,
};
