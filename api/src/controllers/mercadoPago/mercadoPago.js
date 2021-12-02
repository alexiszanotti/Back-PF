const { PROD_ACCESS_TOKEN } = process.env;
const { Cart, Product, ProductsInCart } = require("../../db");

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN,
});

async function Pago(req, res) {
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
        status: "PROCESSING",
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

    if (cart.id !== cartId) {
      return res.status(404).json({ message: 'No existe orden en estado "CART"' });
    } else {
      let preference = {
        items: cart.ProductsInCarts.map(e => {
          return {
            title: e.product.productName,
            unit_price: e.product.salePrice,
            picture_url: e.product.images,
            quantity: e.quantity,
          };
        }),
        //Setea el resultado de pago en aprobado o desaprobado(no hay grises)
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
          console.log(redireccion)
          res.send(global.id);
        })
        .catch(function (error) {
          error;
        });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { Pago };
