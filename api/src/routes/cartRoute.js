const { Router } = require("express");
const router = Router();
const { removeProductsCart } = require("../controllers/removeProductsCart");
const { addToCart } = require("../controllers/addToCart");
const { getCartByUser } = require("../controllers/getCartByUser");

router.post("/", addToCart);
router.get("/", getCartByUser);
router.delete("/", removeProductsCart);

module.exports = router;
