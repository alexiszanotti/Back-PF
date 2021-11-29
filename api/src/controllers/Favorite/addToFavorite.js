//add product to favorite
const { User, Product } = require("../../db");

async function addToFavorite(req, res, next) {
  try {
    const { productId, userId } = req.body;
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["id"],
    });
    const product = await Product.findOne({
      where: { id: productId },
      attributes: ["id", "productName", "salePrice", "images", "stock"],
    });
    if (user && product) {
      let complete = await user.addProduct(product);
      res.status(200).send(complete);
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { addToFavorite };
