const { User, Cart } = require("../../db");

async function createUser(req, res, next) {
  try {
    const { email, name, lastName, birthDay, gender } = req.body;
    if(email && name &&  lastName &&  birthDay && gender){
      const user = await User.findAll({
        where: { email: email },
      })
      console.log(user)
      if(user.length === 0){
        console.log("entro aqui (12)")
        let user1 = await User.create({ email, name, lastName, birthDay, gender, type: "User" });
        let cart = await Cart.create({});
        let completeUser = await user1.setCart(cart);
        return res.status(200).send({ Msge: "Usuario creado con exito", completeUser });
      }else {
        console.log("entro aqui (18)")
        return res.status(400).json({msg:"este usuario ya se encuentra registrado"})
      }

    }else {
      console.log("entro aqui (23)")
      return res.status(400).json({msj : "falta algun campo"})
    }

  } catch (error) {
    next(error);
  }
}

module.exports = { createUser };
