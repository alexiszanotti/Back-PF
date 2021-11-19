const { Router } = require("express");
const { addToFavorite } = require("../controllers/addToFavorite");

const router = Router();

router.post("/", addToFavorite);

module.exports = router;
