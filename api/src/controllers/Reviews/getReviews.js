const { Reviews } = require("../../db");

async function getReviews(req, res) {
  let { id } = req.query;
  try {
    if (id) {
      let reviews = await Reviews.findAll({
        attributes: ["id", "score", "review"],
      });
      if (reviews) {
        let reviewsFound = reviews.filter(e => {
          return e.id === id;
        });
        return res.status(200).send(reviewsFound);
      } else {
        return res.status(404).send({ msg: "I did not find the reviews" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getReviews };
