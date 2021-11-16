const { Router } = require("express");
const { getReviews } = require("../controllers/getReviews");
const { postReviews } = require("../controllers/postReviews");
const router = Router();

router.post("/post", postReviews);
router.get("/", getReviews);

module.exports = router;
