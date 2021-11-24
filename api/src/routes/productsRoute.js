const { Router } = require("express");
const { getProducts } = require("../controllers/Products/getAllProducts");
const { getProductById } = require("../controllers/Products/getProductById");
const { createProduct } = require("../controllers/Products/createProduct");
const { updateProduct } = require("../controllers/Products/updateProduct");

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/", updateProduct);

module.exports = router;
