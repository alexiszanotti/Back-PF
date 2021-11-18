const { Router } = require("express");
const { getAllUsers } = require("../controllers/getAllUsers");
const { createUser } = require("../controllers/createUser");
const { updateUser } = require("../controllers/updateUser");
const { loginUser } = require("../controllers/loginUser");

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/", updateUser);
router.post("/loginUser", loginUser);

module.exports = router;
