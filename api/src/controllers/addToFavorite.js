//add product to favorite
const { User, Product } = require("../db");

async function addToFavorite(req, res) {
  try {
    const { productId, userId } = req.body;
    const user = await User.findAll({
      where: { id: userId },
      include: [
        {
          model: Product,
          attributes: ["id", "productName"],
        },
      ],
    });

    const user2 = await User.findOne({
      where: { id: userId },
    });

    const product = await Product.findOne({ where: { id: productId } });
    let favorite = [];

    if (user.products !== undefined) {
      favorite = user.products.forEach(item => item);
    }
    if (!user || !product) {
      return res.status(404).send("User or product not found");
    }
    if (favorite.length > 0) {
      var newFavorite = favorite.filter(el => el.id === productId);
      console.log("ENTRE AL IF");
      if (newFavorite !== undefined) {
        return res.status(400).send("Product already in favorite");
      }
    }

    await user2.addProduct(product);
    return res.status(200).send("The product was added to favorites");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addToFavorite };
