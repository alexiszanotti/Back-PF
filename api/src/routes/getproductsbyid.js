const { Router } = require("express");
const router = Router();
const { getProductById } = require("../controllers/getProductById");

router.get("/products/:id", getProductById);

module.exports = router;
