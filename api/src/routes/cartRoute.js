const { Router } = require("express");
const router = Router();
const { removeProductsCart } = require("../controllers/Cart/removeProductsCart");
const { addToCart } = require("../controllers/Cart/addToCart");
const { getCartByUser } = require("../controllers/Cart/getCartByUser");

router.post("/", addToCart);
router.get("/", getCartByUser);
router.delete("/", removeProductsCart);

module.exports = router;
