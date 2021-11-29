//get info payments
const { Cart, Order } = require("../../db");

async function getInfoPago(req, res, next) {
  try {
    const { payment_id, status, external_reference } = req.query;

    const cart = await Cart.findByPk(external_reference);
    cart.update({
      status: "COMPLETED",
    });
    const order = await Order.create({
      payment_id,
      payment_status: status,
      CartId: external_reference,
    });

    cart.setOrder(order);
    res.redirect(`http://localhost:3000/`);
  } catch (error) {
    next(error);
  }
}

module.exports = { getInfoPago };
