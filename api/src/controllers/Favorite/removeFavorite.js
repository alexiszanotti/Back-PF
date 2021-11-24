const { User, Product, favorite_product } = require("../../db");

async function removeFavorite(req, res) {
  try {
    const { userId, productId } = req.body;
    /* const user2 = await User.findAll({
      where: { id: userId },
      include:
      {
        model: Product,
        attributes: ["id", "productName"],
      },
    }); */

    const projects = await favorite_product.destroy(
      {
        productId: "",
      },
      {
        where: {
          productId: productId,
          userId: userId,
        },
      }
    );

    return res.status(200).send(projects);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { removeFavorite };
