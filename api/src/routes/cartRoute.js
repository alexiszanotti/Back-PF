const { Router } = require("express");
const router = Router();

const { addToCart } = require("../controllers/Cart/addToCart");
const { getCartByUser } = require("../controllers/Cart/getCartByUser");

router.post("/", addToCart);
router.get("/", getCartByUser);

module.exports = router;
