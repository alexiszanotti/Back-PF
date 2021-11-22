const { User } = require("../db");

async function getFavorite(req, res) {
  try {
    const { userId } = req.body;
    const user2 = await User.findOne({
      where: { id: userId },
    });
    if (user2) {
      const projects = await user2.getProducts();
      if (projects.length === 0) {
        return res.status(400).send({ msg: "este usuario no tiene productos" });
      } else {
        return res.status(200).send(projects);
      }
    } else {
      return res.status(200).send({ msg: "no existe este id de usuario" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getFavorite };
