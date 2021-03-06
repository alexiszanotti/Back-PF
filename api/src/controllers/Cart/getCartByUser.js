const { Cart, ProductsInCart, Product } = require("../../db");

async function getCartByUser(req, res, next) {
  const { cartId } = req.query;
  try {
    const cart = await Cart.findOne({
      where: {
        id: cartId,
      },
      attributes: ["id", "status"],
      include: [
        {
          model: ProductsInCart,
          attributes: {
            exclude: ["id", "price", "quantity", "productName", "CartId"],
          },
          include: [
            {
              model: Product,
              attributes: ["id", "productName", "salePrice", "images", "stock"],
            },
          ],
        },
      ],
    });
    if (!cart) {
      return res.status(404).send({
        message: "No se encontraron usuarios con ese ID.",
      });
    }
    return res.status(200).send(cart);
  } catch (error) {
    next(error);
  }
}

module.exports = { getCartByUser };
