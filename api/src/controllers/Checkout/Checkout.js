const { Cart, Product, ProductsInCart, User } = require("../../db");

async function Checkout(req, res, next) {
  const { cartId, InfoCart, infoProducts } = req.body;
  try {
    if (cartId && InfoCart) {
      const auxproductsInCart = await ProductsInCart.findAll({
        where: {
          CartId: cartId,
        },
        include: [
          {
            model: Product,
            attributes: ["id", "productName", "salePrice", "images", "stock"],
          },
        ],
      });
      if (auxproductsInCart.length > 0) {
        //recorremos auxiliar auxproductsInCart para verificar si los productos que estoy recibiendo en infoproducts coinciden con los productos del
        for (let i = 0; i < auxproductsInCart.length; i++) {
          for (let j = 0; j < infoProducts.length; j++) {
            //la cantidad de auxProductsInCart tiene que ser igual a la cantidad de infoProducts
            if (auxproductsInCart[i].productId === infoProducts[j].productId) {
              const x = await ProductsInCart.update(
                {
                  price: infoProducts[i].salePrice,
                  productName: infoProducts[i].productName,
                  quantity: infoProducts[j].cantidad,
                },
                { where: { id: auxproductsInCart[i].id } }
              );
              if (x === 1) {
                let updateStock = await Product.update(
                  {
                    stock: auxproductsInCart[i].stock - infoProducts[j].cantidad,
                  },
                  { where: { id: auxproductsInCart[i].productId } }
                );
              }
            }
          }
        }

        const y = await Cart.update(
          {
            paymentMethod: InfoCart[0].paymentMethod,
            dateOfPurchase: InfoCart[0].dateOfPurchase,
            confirmationDate: InfoCart[0].confirmationDate,
            dateCancellation: InfoCart[0].dateCancellation,
            status: "PROCESSING",
          },
          {
            where: {
              id: cartId,
            },
          }
        );
        return res.status(200).send({ msg: "El carrito se actualizó correctamente" });
      } else {
        return res.status(400)({ msg: "no se pudo actualizar el carrito" });
      }
    } else {
      return res.status(404).json({ msg: "no se esta pasando ningun parametro por body " });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { Checkout };
