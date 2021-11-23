const { User, Cart } = require("../db");

async function createUser(req, res, next) {
  try {
    const { email, name, lastName, birthDay, gender, CartId } = req.body;

    let cart = await Cart.create({});
    let user = await User.create({ email, name, lastName, birthDay, gender, type: "User", CartId });

    let completeUSer = await user.addCart(cart);
    res.status(200).send({ Msge: "Usuario creado con exito", completeUSer });
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser };
