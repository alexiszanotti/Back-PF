const { Router } = require("express");
const router = Router();

const { addToCart } = require("../controllers/addToCart");
const { getCartByUser } = require("../controllers/getCartByUser");

router.post("/", addToCart);
router.get("/", getCartByUser);

module.exports = router;
