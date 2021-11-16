const { Router } = require("express");
const router = Router();
const { size, gender, collection } = require("../controllers/categories");

router.get("/size", size);
router.get("/gender", gender);
router.get("/collections", collection);

module.exports = router;
