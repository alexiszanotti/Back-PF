const { Router } = require("express");
const router = Router();

const { addToCart } = require("../controllers/addToCart");

router.post("/", addToCart);

module.exports = router;
