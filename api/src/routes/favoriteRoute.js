const { Router } = require("express");
const { addToFavorite } = require("../controllers/Favorite/addToFavorite");
const { getFavorite } = require("../controllers/Favorite/getFavorite");
const { removeFavorite } = require("../controllers/Favorite/removeFavorite");

const router = Router();

router.post("/", addToFavorite);
router.get("/", getFavorite);
router.delete("/", removeFavorite);

module.exports = router;
