const OrderItem = require("../models/order-item");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");

const seeDetails = async (req, res, next) => {
  const token = await req.cookies.jwt;
  const userId = await jwt.verify(
    token,
    "secret key",
    (error, decodedToken) => {
      if (error) res.status(400).send(error);
      return decodedToken.id;
    }
  );
  const orderId = req.params.orderId;
  Order.findAll({
    where: { userId: userId, id: orderId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  }).then((order) => {
    if (order.length === 0) {
      return res.status(404).json("沒有此訂單detail");
    }
    const id = order[0].id;
    OrderItem.findAll({ where: { orderId: id } })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = {
  seeDetails,
};
