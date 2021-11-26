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

    const order = await Cart.findOne({
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
    console.log(order);
    if (order.id !== cartId && order.status !== "PENDING") {
      return res.status(404).json({ message: 'No existe orden en estado "CART"' });
    } else {
      let preference = {
        items: order.ProductsInCarts?.map(e => {
          return {
            title: e.product.productName,
            unit_price: e.product.salePrice,
            quantity: 1,
          };
        }),

        back_urls: {
          success: "localhost:3000/",
          failure: "localhost:3000/",
          pending: "localhost:3000/",
        },
        auto_return: "approved",
        external_reference: "Prueba",
      };

      // let aux = await mercadopago.preferences.create(preference);
      // return res.status(200).json(aux);
      mercadopago.preferences
        .create(preference)
        .then(function (respuesta) {
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
