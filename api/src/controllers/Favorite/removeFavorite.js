const { User, Product } = require("../../db");

async function removeFavorite(req, res, next) {
  try {
    const { userId, productId } = req.body;

    const user = await User.findOne({ where: { id: userId } });
    const product = await Product.findOne({ where: { id: productId } });

    await user.removeProduct(product);

    res.status(200).send({ Mge: "Producto eliminado de favoritos" });
  } catch (error) {
    next(error);
  }
}

module.exports = { removeFavorite };
