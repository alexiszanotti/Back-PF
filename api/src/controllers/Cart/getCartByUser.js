var validator = require("validator");
const { Cart, Product, User } = require("../../db");

async function getCartByUser(req, res, next) {
  try {
    const { userId } = req.query;
    let aux = validator.isUUID(userId);
    if (aux) {
      let productosDelUsuario = await User.findOne({
        where: { id: userId },
        attributes: [
          "id",
          "name",
          "lastName",
          "email",
          "type",
          "birthDay",
          "gender",
          "telephone",
          "address",
          "cp",
        ],

        include: {
          model: Cart,
        },
      });
      if (productosDelUsuario) {
        let aux = Object.values(productosDelUsuario.Cart.products);

        if (aux[0] === "Sin productos") {
          return res.status(404).json({ msg: "Este Usuario no tiene Producto En su carrito" });
        } else {
          return res.status(200).json(productosDelUsuario);
        }
      } else {
        return res.status(404).json({ msg: "Este Usuario no tiene Existe o no tiene carrito" });
      }
    } else {
      return res.status(404).json({ msg: "el userId tiene que ser un uuid valido" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { getCartByUser };
