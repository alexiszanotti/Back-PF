const { User, Cart } = require("../../db");

async function createUser(req, res, next) {
  try {
    const { email, name, lastName, birthDay, gender } = req.body;
    const auxuser = await User.findAll({ where: { email :  email} });
    if(auxuser.length > 0 ){
      res.status(400).send({ Msge: "este usuario ya esta creado" });
    }else {
      let cart = await Cart.create({});
      let user = await User.create({ email, name, lastName, birthDay, gender, type: "User" });
  
      let completeUser = await user.setCart(cart);
      return res.status(200).send({ Msge: "Usuario creado con exito", completeUser });
    }

   
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser };
