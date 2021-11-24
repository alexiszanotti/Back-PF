const { Router } = require("express");
const { getProducts } = require("../controllers/Product/getAllProducts");
const { getProductById } = require("../controllers/Product/getProductById");
const { createProduct } = require("../controllers/Product/createProduct");
const { updateProduct } = require("../controllers/Product/updateProduct");

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/", updateProduct);

module.exports = router;
