const { Router } = require("express");
const router = Router();
const { getProductsDataBase } = require("../controllers/getproductsinfo");
const { Collection } = require("../db");
const {categories, size, gender, collection} = require("../controllers/categories");

router.get("/categories", categories);
router.get("/categories/size", size);
router.get("/categories/gender", gender );
router.get("/categories/collection", collection);

module.exports = router;
