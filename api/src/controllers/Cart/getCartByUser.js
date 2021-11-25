var validator = require("validator");
const { Cart, ProductsInCart, User } = require("../../db");

async function getCartByUser(req, res, next) {
  const { userId } = req.query;
  try {

    let aux = validator.isUUID(userId);
    if (aux) {
      let productosDelUsuario = await User.findOne({
        where: { id: userId },
        attributes: [
          "id",
          "name",
        ],
        include:
          {
            model : Cart,
                
          }
  });

    let aux2 = Cart.getProductsInCarts({where : {userId : productosDelUsuario.cardId}})

  if (productosDelUsuario &&  aux2) {
    /*  let aux = Object.values(productosDelUsuario); */

    return res.status(200).json(aux2);

  } else {
    return res.status(404).json({ msg: "el userId tiene que ser un uuid valido" });
  }
}
  } catch (error) {
  next(error);
}
}

module.exports = { getCartByUser };
