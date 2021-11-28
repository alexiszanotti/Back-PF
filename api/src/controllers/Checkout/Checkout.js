const { Cart, Product, ProductsInCart, User } = require("../../db");

async function Checkout(req, res, next) {
    const { cartId, InfoCart, InfoProductsInCart } = req.body;
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
            if (auxproductsInCart && cart) {
                for (let i = 0; i < auxproductsInCart.length; i++) {
                    const x = await ProductsInCart.update(
                        {
                            price: auxproductsInCart[i].product.salePrice,
                            productName: auxproductsInCart[i].product.productName,
                            quantity: 1
                        },
                        {
                            where: {
                                id: auxproductsInCart[i].id
                            }
                        }
                    )

                }
                const y = await Cart.update(
                    {
                        paymentMethod:InfoCart[0].paymentMethod,
                        dateOfPurchase: InfoCart[0].dateOfPurchase,
                        confirmationDate:InfoCart[0].confirmationDate ,
                        dateCancellation:InfoCart[0].dateCancellation ,
                        dispatchDate:InfoCart[0].dispatchDate,
                        dateOfDelivery:InfoCart[0].dateOfDelivery,
                        status:"PROCESSING"
                    },
                    {
                        where: {
                            id: cartId
                        }
                    }
                )
                return res.status(200).send({ msg: "el carrito se ha actualizado " })
            } else {
                return res.status(400)({ msg: "no se pudo actualizar el carrito" })
            }
        } else {
            return res.status(404).json({ msg: "no se esta pasando ningun parametro por body " })
        }




    } catch (error) {
        next(error);
    }
}

module.exports = { Checkout };