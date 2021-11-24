const { Router } = require("express");
const { getAllUsers } = require("../controllers/Users/getAllUsers");
const { createUser } = require("../controllers/Users/createUser");
const { updateUser } = require("../controllers/Users/updateUser");
const { loginUser } = require("../controllers/Users/loginUser");

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/", updateUser);
router.post("/loginUser", loginUser);

module.exports = router;
