const { PROD_ACCESS_TOKEN } = process.env;
const { Cart, Product, ProductsInCart } = require("../../db");

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN,
});

async function Pago(req, res, next) {
  try {
    const { cartId } = req.body;

    if (!cartId) {
      return res.status(404).json({
        message: "No se ha recibido el userId",
      });
    }

    const cart = await Cart.findOne({
      where: {
        id: cartId,
        status: "PENDING",
      },
      include: [
        {
          model: ProductsInCart,
          attributes: {
            exclude: ["id", "productName"],
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

    if (cart.id !== cartId && cart.status !== "PENDING") {
      return res.status(404).json({ message: 'No existe orden en estado "CART"' });
    } else {
      let preference = {
        items: cart.ProductsInCarts.map(e => {
          return {
            title: e.product.productName,
            unit_price: e.product.salePrice,
            picture_url: e.product.images,
            quantity: 1,
          };
        }),
        installments: 3,
        binary_mode: true,

        back_urls: {
          success: "localhost:3001/mercadoPago/pago",
          failure: "localhost:3001/mercadoPago/pago",
        },
        auto_return: "approved",
        external_reference: `${cartId}`,
      };

      mercadopago.preferences
        .create(preference)
        .then(function (respuesta) {
          global.id = respuesta.body.id;
          const redireccion = respuesta.body.init_point;
          res.send(redireccion);
        })
        .catch(function (error) {
          error;
        });
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { Pago };
