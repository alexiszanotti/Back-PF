//get info payments
const { Cart, Order, User, CartSold, ProductsInCart, Product } = require("../../db");

async function getInfoPago(req, res, next) {
  try {
    const { payment_id, status, external_reference } = req.query;

    const cart = await Cart.findByPk(external_reference, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "lastName", "address"],
        },
        {
          model: ProductsInCart,
          attributes: ["id", "quantity", "price", "productId"],
          include: [
            {
              model: Product,
              attributes: ["id", "productName", "images", "salePrice"],
            },
          ],
        },
      ],
    });
    cart.update({ status: "COMPLETED" });
    const order = await Order.create({
      payment_id,
      payment_status: status,
      CartId: external_reference,
    });

    cart.setOrder(order);

    const cartSold = await CartSold.create({
      userId: cart.users[0].id,
      id: external_reference,
      status: "COMPLETED",
      dateOfPurchase: cart.dateOfPurchase,
      confirmationDate: cart.confirmationDate,
      dateCancellation: cart.dateCancellation,
      products: cart.ProductsInCarts.map(el => {
        return {
          productId: el.productId,
          quantity: el.quantity,
          price: el.product.salePrice,
          images: el.product.images,
          productName: el.product.productName,
        };
      }),
    });
    const carrito = await Cart.create({});
    const user = await User.findByPk(cart.users[0].id);

    if (user) {
      await user.setCart(carrito);
      await cart.removeUser(user);

      res.redirect(`http://localhost:3000/home`);
    } else {
      return res.status(404).send({ Msge: "No existe usuario" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { getInfoPago };
