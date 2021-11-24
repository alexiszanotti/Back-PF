const { Router } = require("express");
const { getAllUsers } = require("../controllers/User/getAllUsers");
const { createUser } = require("../controllers/User/createUser");
const { updateUser } = require("../controllers/User/updateUser");
const { loginUser } = require("../controllers/User/loginUser");

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/", updateUser);
router.post("/loginUser", loginUser);

module.exports = router;
