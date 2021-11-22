const { Router } = require("express");
const { addToFavorite } = require("../controllers/addToFavorite");
const { getFavorite } = require("../controllers/getFavorite");
const { removeFavorite } = require("../controllers/removeFavorite");

const router = Router();

router.post("/", addToFavorite);
router.get("/", getFavorite)
router.delete("/", removeFavorite)

module.exports = router;
