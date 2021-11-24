const { Router } = require("express");
const { getReviews } = require("../controllers/Reviews/getReviews");
const { postReviews } = require("../controllers/Reviews/postReviews");
const router = Router();

router.get("/", getReviews);
router.post("/", postReviews);

module.exports = router;
