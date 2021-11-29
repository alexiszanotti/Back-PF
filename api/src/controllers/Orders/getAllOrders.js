// get status of orders
const { Cart, ProductsInCart, Product, Order } = require("../../db");

async function getAllOrders(req, res, next) {
  try {
    const cart = await Cart.findAll({
      attributes: {
        exclude: ["orderId"],
      },
      include: [
        {
          model: Order,
        },
        {
          model: ProductsInCart,

          attributes: {
            exclude: [, "productId", "CartId"],
          },
        },
      ],
    });
    res.status(200).send(cart);
  } catch (error) {
    return next(error);
  }
}

module.exports = { getAllOrders };
