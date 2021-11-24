var validator = require("validator");
const { Cart, Product, User } = require("../../db");

async function addToCart(req, res, next) {
  try {
    const { cartId, productId, userId } = req.body;

    let productosDelUsuario = await User.findOne({
      where: { id: userId },
      attributes: ["email"],
      include: {
        model: Cart,
        attributes: ["id", "products"],
      },
    });
    let aux = Object.values(productosDelUsuario.Cart.products);

    if (aux[0] === "Sin productos") {
      let product = await Product.findOne({
        raw: true,
        where: { id: productId },
        attributes: ["id", "productName", "salePrice", "images", "stock"],
      });
      let aux = validator.isUUID(product.id);
      if (aux) {
        let cartProduct = await Cart.update({ products: [product] }, { where: { id: cartId } });
        return res.status(200).json({ Msge: "Producto agregado con exito" });
      }
    } else {
      let productos = productosDelUsuario.Cart.products;
      var product = await Product.findOne({
        where: { id: productId },
        attributes: ["id", "productName", "salePrice", "images", "stock"],
      });
      let aux = validator.isUUID(product.id);
      if (aux) {
        let productoYaExistente = productos.filter(e => e.id === product.id);

        if (productoYaExistente.length > 0) {
          return res.status(404).json({ msg: "este Producto Ya esa en el carrito" });
        } else {
          productos.push(product);
          let cartProduct = await Cart.update({ products: productos }, { where: { id: cartId } });
          return res.status(200).json({ msg: "Producto agregado al carrito" });
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { addToCart };
