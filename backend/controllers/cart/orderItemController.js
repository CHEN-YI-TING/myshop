const OrderItem = require("../../models/order-item");
const Order = require("../../models/order");

const seeDetails = async (req, res, next) => {
  try {
    const userId = req.userId;
    const orderId = req.params.orderId;
    if (!orderId) res.status(404).send({ error: "order not found" });
    Order.findAll({
      where: { userId: userId, id: orderId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }).then((order) => {
      if (order.length === 0) {
        return res.status(404).send({ error: "沒有此訂單detail" });
      }
      const id = order[0].id;
      console.log(id);
      OrderItem.findAll({ where: { orderId: id } })
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seeDetails,
};
