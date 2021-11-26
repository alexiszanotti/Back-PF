const { Reviews } = require("../../db");

async function getReviews(req, res) {
  const { userId, productId } = req.body;
  try {
    //Ver todas las revies de un producto
    if (productId) {
      const reviews = await Reviews.findAll({
        where: {
          productId: productId,
        },
      });
      res.status(200).send(reviews);
    }

    //Ver las reviews de un usuario
    if (userId) {
      const reviews = await Reviews.findAll({
        where: {
          userId: userId,
        },
      });
      res.status(200).send(reviews);
    }

    //Ver las reviews de un usuario y un producto
    if (userId && productId) {
      const reviews = await Reviews.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });
      res.status(200).send(reviews);
    }

    //Ver todas las reviews
    const reviews = await Reviews.findAll();
    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getReviews };
