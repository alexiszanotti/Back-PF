var validator = require("validator");
const { Cart, Product, ProductsInCart, User } = require("../../db");

async function addToCart(req, res, next) {
  const { cartId, productId } = req.body;
  try {

    let carritoDelUsuario = await Cart.findOne({
      where: { id: cartId },
    });
    let aux1 = validator.isUUID(carritoDelUsuario.id);


    if (aux1) {
      let product = await Product.findOne({
        where: { id: productId },
        attributes: ["id", "productName", "salePrice", "images", "stock"],
      });
      let aux2 = validator.isUUID(product.id);

      if (aux2) {

        let aux5 = await ProductsInCart.findAll({
          where: {
            productId: product.id,
            CartId: cartId
          }
        })
        if (aux5.length > 0) {
          return res.status(400).json({ MSG: "este producto ya esta agregado al carrito" })
        } else if (aux5.length === 0) {
          let cartProduct = await carritoDelUsuario.createProductsInCart({
            productId: product.id,
            price: product.salePrice,
            dateOfPurchase: "25-11-2021",
            discount: 10,
            amount: 1,
            CartId: carritoDelUsuario.id
          });

          return res.status(200).json(cartProduct);

        }

      } else {
        return res.status(404).json({ msg: "ese id de producto no pertenece a ningun producto" })

      }
    } else {
      return res.status(404).json({ msg: "ese cartid no tiene un carrito asociado" })
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { addToCart };