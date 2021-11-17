const { Router } = require("express");
const router = Router();
const { size, gender, collection, collections } = require("../controllers/categories");

router.get("/size", size);
router.get("/gender", gender);
router.get("/collections", collection);
router.get("/", collections); //Trae el nombre de las colecciones

module.exports = router;
