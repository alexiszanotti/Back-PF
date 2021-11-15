const { Router } = require("express");
const getAllUsers = require("../controllers/getAllUsers");

const router = Router();

router.get("/getAllUsers", getAllUsers);


module.exports = router;
