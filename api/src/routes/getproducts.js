const { Router } = require("express");
const { getProductsDataBase } = require("../controllers/getproductsinfo");

const router = Router();

router.get("/products", getProductsDataBase);

module.exports = router;
