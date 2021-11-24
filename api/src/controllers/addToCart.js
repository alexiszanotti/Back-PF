//add product a to cart
const { Cart, Product } = require("../db");

async function addToCart(req, res, next) {
  try {
    const { cartId, productId } = req.body;

    let cart = await Cart.findAll({
      where: { id: cartId },
    });
    let product = await Product.findOne({
      where: { id: productId },
      attributes: ["id", "productName", "salePrice", "images"],
      include: { model: Cart },
    });

    let cartProduct = await cart[0].setProduct(product);

    res.status(200).json(cartProduct);
  } catch (error) {
    next(error);
  }
}

module.exports = { addToCart };
