const { Router } = require("express");
const router = Router();
const { Checkout } = require("../controllers/Checkout/Checkout");

router.patch("/", Checkout);

module.exports = router;