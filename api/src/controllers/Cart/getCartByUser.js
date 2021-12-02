const { Cart, ProductsInCart, Product } = require("../../db");
var validator = require('validator');

async function getCartByUser(req, res, next) {
  const { cartId } = req.query;
  try {
    if(!validator.isUUID(cartId)){
      return res.status(404).send({
        message: "el cartId no es de tipo uuid o es null ",
      });
    }else{
      const cart = await Cart.findOne({
        where: {
          id: cartId,
        },
        attributes: ["id", "status"],
        include: [
          {
            model: ProductsInCart,
            attributes: {
              exclude: ["id", "price", "quantity", "productName", "CartId"],
            },
            include: [
              {
                model: Product,
                attributes: ["id", "productName", "salePrice", "images", "stock"],
              },
            ],
          },
        ],
      });
      if (!cart) {
        return res.status(404).send({
          message: "No se encontraron usuarios con ese ID.",
        });
      }
      return res.status(200).send(cart);

    }
    
  } catch (error) {
    next(error);
  }
}

module.exports = { getCartByUser };
