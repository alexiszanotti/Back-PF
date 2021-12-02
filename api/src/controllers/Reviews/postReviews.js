const { Reviews, ProductsInCart, Cart, Product } = require("../../db");

async function postReviews(req, res, next) {
  const { review, score, productId, cartId, userId } = req.body;
  console.log(cartId, "cartID")
  try {
    if (cartId) {
      const busqueda = await Cart.findAll({
        where: {
          status: "COMPLETED",
          id: cartId,
        },
        include: [
          {
            model: ProductsInCart,
            where:{
              productId: productId,
            },
            include: [{
              model: Reviews
            }]
          }
        ]
      })
      if (busqueda.length > 0) {
        let productoCart = await ProductsInCart.findOne({
          where: {
            CartId: cartId
          }
        })
        let reseñaCreada = await Reviews.create({score: score, review: review})
        let aux = await productoCart.setReviews(reseñaCreada) 
        return res.status(200).send(aux)
      } else {
        return res.status(404).send({ message: "teo puto" })
      }
    }else{
      res.status(400).send({message: "no hay cart ID"})
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { postReviews };