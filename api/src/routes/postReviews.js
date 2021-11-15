const { Router } = require("express");
const { Reviews } = require("../db");
const router = Router();

router.post("/reviews", async (req, res, next) => {
  try {
    let { review, score, productId } = req.body;

    let reviewCreate = await Reviews.create({
      review: review,
      score: score,
      productId: productId,
    });
    if (reviewCreate) {
      return res.status(200).send(reviewCreate);
    } else {
      return res.status(404).send({ msg: "no se creoo compa" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
