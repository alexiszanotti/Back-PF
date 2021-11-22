const { Router } = require("express");
const router = Router();
const { gender, collection, collections } = require("../controllers/categories");
const { createCollection } = require("../controllers/createCollection");

router.get("/gender", gender);
router.get("/collections", collection);
router.get("/", collections); //Trae el nombre de las colecciones
router.post("/", createCollection);

module.exports = router;
