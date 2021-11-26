const { Cart, ProductsInCart, Product, User } = require("../../db");

async function getOrderByCartId(req, res, next) {
  const { CartId } = req.query;

  try {
    const user = await User.findOne({
      where: {
        CartId,
      },
      attributes: ["id", "CartId", "email", "name"],
      include: [
        {
          model: Cart,
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
                  attributes: ["id", "salePrice", "productName", "images"],
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
}

module.exports = { getOrderByCartId };
