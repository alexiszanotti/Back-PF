// remove all favorite
const { User, Product } = require("../../db");

async function removeAllFavorite(req, res, next) {
  try {
    const { userId } = req.query;

    const user = await User.findOne({ where: { id: userId } });
    const products = await Product.findAll();

    await user.removeProducts(products);

    res.status(200).json({
      message: "Todos los productos eliminados de favoritos",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { removeAllFavorite };
