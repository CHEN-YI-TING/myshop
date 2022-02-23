const OrderItem = require("../../models/order-item");
const Order = require("../../models/order");

const getAll = async (req, res, next) => {
  try {
    const userId = req.userId;
    Order.findAll({
      where: { userId: userId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }).then((orders) => {
      if (orders.length === 0) {
        return res.status(200).send(orders);
      } else {
        return res.status(200).send(orders);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const createOrder = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ error: "沒有內容" });
  }
  try {
    const { orderArray, allPrice } = req.body;
    const userId = req.userId;
    Order.create({
      dataReceived: new Date(),
      userId: userId,
      totalPrice: allPrice,
    }).then((data) => {
      const orderId = data.toJSON().id;
      const newOrder = [];
      for (let i = 0; i < orderArray.length; i++) {
        let orderObj = {
          quantity: orderArray[i].qty,
          totalPrice: orderArray[i].price * orderArray[i].qty,
          orderId: orderId,
          productId: orderArray[i].id,
        };
        newOrder.push(orderObj);
      }
      OrderItem.bulkCreate(newOrder);
      res.status(200).json({ success: "成功建立", orderId: orderId });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  createOrder,
};
