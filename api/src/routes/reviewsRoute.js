const { Router } = require("express");
const { getReviews } = require("../controllers/Review/getReviews");
const { postReviews } = require("../controllers/Review/postReviews");
const router = Router();

router.get("/", getReviews);
router.post("/", postReviews);

module.exports = router;
