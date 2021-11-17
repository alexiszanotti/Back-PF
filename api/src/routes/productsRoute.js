const { Router } = require("express");
const { getProducts } = require("../controllers/getAllProducts");
const { getProductById } = require("../controllers/getProductById");
const { createProduct } = require("../controllers/createProduct");
const { updateProduct } = require("../controllers/updateProduct");

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/createProduct", createProduct);
router.post("/updateProduct", updateProduct);

module.exports = router;
