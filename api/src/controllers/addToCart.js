//add to cart
const { User, Cart, Product } = require("../db");

async function addToCart(req, res) {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      res.status(404).send({
        Error: "User or product not found",
      });
    } else {
      let product = await Product.findOne({
        where: {
          id: productId,
        },
      });
      let user = await User.findOne({
        where: {
          id: userId,
        },
        include: {
          model: Product,
        },
      });
      let userProduct = await user.addProduct(product);

      let cart = await Cart.create({
        where: {
          userId: userId,
        },
      });

      let userCart = await userProduct.addCart(cart);

      res.status(200).send({
        message: "Product added to cart",
        userCart,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addToCart };
