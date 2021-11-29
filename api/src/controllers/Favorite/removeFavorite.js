const { User, Product } = require("../../db");

async function removeFavorite(req, res, next) {
  try {
    const { userId, productId } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    const product = await Product.findOne({ where: { id: productId } });
    if (!user || !product) {
      return res.status(404).json({
        message: "Usuario o producto no encontrado",
      });
    }
    await user.removeProduct(product);
    return res.status(200).json({
      message: "Producto eliminado de favoritos",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { removeFavorite };
