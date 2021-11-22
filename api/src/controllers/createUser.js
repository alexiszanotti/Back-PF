//email, name, lastName, birthDay, password, gender
//create user controller
const { User, Cart } = require("../db");

async function createUser(req, res, next) {
  try {
    const { email, name, lastName, birthDay, gender } = req.body;

    let user = User.create({ email, name, lastName, birthDay, gender, type: "User" });

    res.status(200).send({ Msge: "Usuario creado con exito", user });
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser };
