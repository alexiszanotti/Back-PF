const { Reviews, Product, Cart } = require("../../db");

async function postReviews(req, res, next) {
  const { review, score, productId, userId } = req.body;

  try {
    const cart = await Cart.findOne({
      where: {
        status: "COMPLETED",
        userId: userId,
      },
      include: [
        {
          model: Product,
          where: {
            id: productId,
          },
        },
      ],
    });

    if (!cart) {
      return res.status(400).json({
        message: "Carrito no encontrado",
      });
    }

    const reviewExist = await Reviews.findOne({
      where: {
        productId: productId,
        userId: userId,
      },
    });

    if (reviewExist) {
      return res.status(400).json({
        message: "Ya has realizado una reseña de este producto",
      });
    }

    const reviewCreated = await Reviews.create({
      review,
      score,
      productId,
      userId,
    });

    return res.status(201).json({
      message: "Reseña creada",
      reviewCreated,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { postReviews };