// get status of orders
const { Cart, ProductsInCart, Product } = require("../../db");

async function getAllOrders(req, res, next) {
  try {
    const cart = await Cart.findAll({
      attributes: {
        exclude: ["confirmationDate", "dateCancellation", "dateOfDelivery"],
      },
      include: [
        {
          model: ProductsInCart,
          attributes: {
            exclude: [, "productId", "CartId"],
          },
          include: [
            {
              model: Product,
              attributes: ["id", "salePrice", "productName"],
            },
          ],
        },
      ],
    });
    res.status(200).send(cart);
  } catch (error) {
    return next(error);
  }
}

module.exports = { getAllOrders };
