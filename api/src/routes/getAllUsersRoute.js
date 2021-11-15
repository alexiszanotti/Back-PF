const { Router } = require("express");
const getAllUsers = require("../controllers/getAllUsers");

const router = Router();

router.get("/getAllUsers", async (req, res, next) => {
  try {
    const allUser = await getAllUsers();

    if (allUser.length > 0) return res.status(200).send(allUser);
    else return res.status(404).send({ error: "no hay usuarios" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAllUsers/:name", async (req, res, next) => {
  const { name, gender } = req.params;

  try {
    const allUser = await getAllUsers();

    gender && (allUser = allUser.filter(e => e.name.charAt(0) === gender.charAt(0)));

    const user = allUser.filter(e => e.userName === name);

    if (user.length > 0) return res.status(200).send(user);

    return res.status(404).send({ error: "el usuario no existe" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
