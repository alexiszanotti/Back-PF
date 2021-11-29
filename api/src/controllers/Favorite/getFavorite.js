const { User, Product } = require("../../db");

async function getFavorite(req, res, next) {
  try {
    const { userId } = req.query;
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["id"],
      include: [
        {
          model: Product,
          attributes: ["id", "productName", "salePrice", "images"],
        },
      ],
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = { getFavorite };
