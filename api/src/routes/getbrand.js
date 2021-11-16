const { Router } = require("express");
const router = Router();
const { size, gender, collection } = require("../controllers/categories");

router.get("/categories/size", size);
router.get("/categories/gender", gender);
router.get("/categories/collection", collection);

module.exports = router;
