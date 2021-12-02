const { Product, ProductsInCart, Reviews } = require("../../db");

const getReviews = async (req, res) => {
  const { idProduct } = req.body;
  console.log(idProduct);
  try {
    if (!idProduct) {
      return res.status(400).json({
        message: "Bad request",
      });
    } else {
      const product = await Product.findByPk(idProduct, {
        include: [
          {
            model: ProductsInCart,
            attributes: ["id", "price", "quantity", "productName"],
            include: [
              {
                model: Reviews,
                attributes: ["id", "review", "score"],
              },
            ],
          },
        ],
      });
      if (product.length > 0) {
        return res.status(200).json(product);
      } else {
        return res.status(404).json({ msg: "hago pull?" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getReviews };
