const { Router } = require("express");
const { getProductsDataBase } = require("../controllers/getproductsinfo");
const { getProductById } = require("../controllers/getProductById");
const { createProduct } = require("../controllers/createProduct");
const { updateProduct } = require("../controllers/updateProduct");

const router = Router();

router.get("/", getProductsDataBase);
router.get("/:id", getProductById);
router.post("/createProduct", createProduct);
router.post("/updateProduct", updateProduct);

module.exports = router;
