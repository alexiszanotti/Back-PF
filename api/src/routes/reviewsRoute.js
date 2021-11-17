const { Router } = require("express");
const { getReviews } = require("../controllers/getReviews");
const { postReviews } = require("../controllers/postReviews");
const router = Router();

router.get("/", getReviews);
router.post("/", postReviews);

module.exports = router;
