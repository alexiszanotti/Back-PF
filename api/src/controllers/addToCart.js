//add to cart
const { User, Cart, Product } = require("../db");

async function addToCart(req, res) {
  try {
    // const { userId, productId, cartId } = req.body;
    // const user = await User.findOne({ where: { id: userId } });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addToCart };
