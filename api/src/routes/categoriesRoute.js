const { Router } = require("express");
const router = Router();
const { gender, collection, collections } = require("../controllers/Categories/categories");
const { createCollection } = require("../controllers/Categories/createCollection");
const { removeCollection } = require("../controllers/Categories/removeCollection");

router.get("/gender", gender);
router.get("/collections", collection);
router.get("/", collections); //Trae el nombre de las colecciones
router.post("/", createCollection);
router.delete("/", removeCollection);

module.exports = router;
