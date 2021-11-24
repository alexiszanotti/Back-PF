//add product to favorite
const { User, Product } = require("../../db");

async function addToFavorite(req, res) {
  try {
    const { productId, userId } = req.body;
    let user = await User.findAll({
      where: { id: userId },
      include: {
        model: Product,
        attributes: ["id", "productName"],
      },
    });

    const user2 = await User.findOne({
      where: { id: userId },
    });

    let product = await Product.findOne({ where: { id: productId } });

    if (!user || !product) {
      return res.status(404).send("User or product not found");
    }

    if (user[0].products.length === 0) {
      await user2.addProduct(product);
      return res.status(200).send("The product was added to favorites");
    }
    var newFavorite = user[0].products.filter(el => el.id === productId);
    console.log(newFavorite);
    if (newFavorite.length > 0) {
      return res.status(400).send("Product already in favorite");
    }
    await user2.addProduct(product);
    return res.status(200).send("The product was added to favorites");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addToFavorite };
