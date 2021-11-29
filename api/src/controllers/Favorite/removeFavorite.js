const { User, Product } = require("../../db");

async function removeFavorite(req, res) {
  try {
    const { userId, productId } = req.body;

    const user = await User.findOne({ where: { id: userId } });
    const product = await Product.findOne({ where: { id: productId } });

    await user.removeProduct(product);

    res.status(200).json({
      message: "Producto eliminado de favoritos",
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { removeFavorite };
