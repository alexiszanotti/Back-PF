const { Router } = require("express");
const { getReviews } = require("../controllers/Reviews/getReviews");
const { postReviews } = require("../controllers/Reviews/postReviews");
const router = Router();

router.post("/ver", getReviews);
router.post("/create", postReviews);

module.exports = router;
