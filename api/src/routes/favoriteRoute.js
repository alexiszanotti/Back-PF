const { Router } = require("express");
const { addToFavorite } = require("../controllers/Favorite/addToFavorite");
const { getFavorite } = require("../controllers/Favorite/getFavorite");
const { removeFavorite } = require("../controllers/Favorite/removeFavorite");
const { removeAllFavorite } = require("../controllers/Favorite/removeAllFavorite");
const router = Router();

router.post("/", addToFavorite);
router.get("/", getFavorite);
router.delete("/", removeFavorite);
router.delete("/all", removeAllFavorite);

module.exports = router;
