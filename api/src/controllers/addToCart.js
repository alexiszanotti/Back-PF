//add to cart
const { User, Cart, Product } = require("../db");

async function addToCart(req, res) {
  try {
    const { userId, productId, cartId } = req.body;

    const user = await User.findOne({
      where: { id: userId },
      include: [{ model: Cart }],
    });
    const product = await Product.findOne({
      where: { id: productId },
    });
    const cart = await Cart.findOne({
      where: { id: cartId },
    });
    if (user.cartId === null) {
      await user.createCart();
    } else {
      await cart.addProduct(product);
    }

    res.status(200).send("Product added to cart");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addToCart };
