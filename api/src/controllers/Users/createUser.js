const { User, Cart } = require("../../db");

async function createUser(req, res, next) {
  try {
    const { email, name, lastName, birthDay, gender } = req.body;

    let cart = await Cart.create({ productList: [] });
    let user = await User.create({ email, name, lastName, birthDay, gender, type: "User" });

    let completeUser = await user.setCart(cart);
    res.status(200).send({ Msge: "Usuario creado con exito", completeUser });
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser };
