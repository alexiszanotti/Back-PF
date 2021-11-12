const { Router } = require("express");
const { Reviews } = require("../db");
const router = Router();


router.get('/reviews', async (req, res, next) => {
    let { id } = req.query
    try {
        if (id) {
            let reviews = await Reviews.findAll({
                attributes: [
                    "id",
                    "score",
                    "review",
                    "productId",
                  ],
            });
            if (reviews) {
                let reviewsFound = reviews.filter(e => {
                    return e.productId === id
                })
                return res.status(200).send(reviewsFound);
            } else {
                return res.status(404).send({ msg: "I did not find the reviews" });
            }
        }
    } catch (error) {
        console.log(error)
    }

})

module.exports = router;

