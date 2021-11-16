const { Router } = require("express");
const router = Router();

const { filterPrice } = require("../controllers/filterPrice");

router.get("/price", filterPrice);

module.exports = router;
