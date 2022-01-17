const OrderItem = require("../models/order-item");
const Order = require("../models/order");
const Product = require("../models/product");

const getAll = async (req, res, next) => {
  const { userId } = req.body;
  Order.findAll({
    where: { userId: userId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  }).then((orders) => {
    if (orders.length === 0) {
      return res.status(404).json("沒有訂單");
    }
    return res.status(200).send(orders);
  });
};

const createOrder = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("錯誤請求");
  }
  const { userId, productId, quantity, totalPrice } = req.body;

  Product.findByPk(productId).then((product) => {
    if (!product) {
      return res.status(404).json("找不到此產品");
    }
  });
  Order.create({
    dataReceived: new Date(),
    userId: userId,
  })
    .then((data) => {
      const orderId = data.toJSON().id;
      OrderItem.create({
        totalPrice: totalPrice,
        orderId: orderId,
        productId: productId,
        quantity: quantity,
      });
      res.status(200).json("成功建立");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getAll,
  createOrder,
};
