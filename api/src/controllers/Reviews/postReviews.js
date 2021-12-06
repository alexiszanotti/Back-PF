const { Reviews, Product, CartSold } = require("../../db");

async function postReviews(req, res, next) {
  const { review, score, productId, userId } = req.body;

  try {
    if (userId) {
      const busqueda = await CartSold.findAll({
        where: {
          userId: userId,
        },
      });

      if (!busqueda.length) {
        return res.status(400).send({ message: "Usuario sin compras realizads (15)" });
      } else {
        let productos = busqueda.map(item => item.products);

        let saleProducts = productos.flat();

        let findProduct = saleProducts.find(el => el.productId === productId);

        if (findProduct) {
          let productoCart = await Product.findOne({
            where: {
              id: productId,
            },
          });
          if (!productoCart) {
            return res.status(400).send({ message: "Producto no existe (29)" });
          } else {
            let reseñaCreada = await Reviews.create({ score: score, review: review });
            let aux = await productoCart.addReviews(reseñaCreada);
            return res.status(200).send({ message: "Reseña creada (33)", aux });
          }
        } else {
          return res.status(404).send({ message: "Producto inexistente (36)" });
        }
      }
    } else {
      return res.status(400).send({ message: "Usuario inexistente (40)" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { postReviews };
