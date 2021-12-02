const { CartSold } = require("../../db");

async function getOrderByCartId(req, res, next) {
  const { userId } = req.query;

  try {
    const cart = await CartSold.findAll({
      where: {
        userId: userId,
      },
    });
    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(404).send("No cart found");
    }
  } catch (error) {
    return next(error);
  }
}

module.exports = { getOrderByCartId };
