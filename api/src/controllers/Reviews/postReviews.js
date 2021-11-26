const { Reviews } = require("../../db");

async function postReviews(req, res, next) {
  try {
    const { review, score } = req.body;
    const { productId } = req.params;

    const newReview = await Reviews.create({
      review,
      score,
      productId,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { postReviews };
