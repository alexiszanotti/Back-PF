const { User } = require("../db");

const getAllUsers = async (req, res, next) => {
  const { id } = req.body;
  try {
    if (id) {
      const user = await User.findOne({ where: { id } });
      user
        ? res.status(200).json(user)
        : res.status(404).send({ error: "No hay usuario con ese nombre" });
    } else {
      let allUsers = await User.findAll({
        attributes: [
          "id",
          "userName",
          "name",
          "lastName",
          "birthDay",
          "password",
          "gender",
          "type",
        ],
      });
      if (allUsers) return res.status(200).send(allUsers);
      else return res.status(404).send({ error: "No hay usuarios" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getAllUsers;
