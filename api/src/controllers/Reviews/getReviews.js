const { Reviews } = require("../../db");

async function getReviews(req, res, next) {
  const { userId, productId } = req.body;
  console.log(userId, productId, "probando");
  try {
    if(userId && !productId) {
      console.log("if 1")
        const reviews = await Reviews.findAll({
          where: {
            userId: userId,
          },
        });
        if(reviews.length > 0){
          console.log("if 2")
          return res.status(200).send(reviews);
        }else{
          return res.status(404).send({message: 'Review not found user'})
        }
    }else if(productId && !userId) {
      console.log("if 3")
        const reviews = await Reviews.findAll({
          where: {
            productId: productId,
          },
        });
        if(reviews.length > 0){
          console.log("if 4")
          return res.status(200).send(reviews);
        } else{
          return res.status(404).send({message: 'Review not found product'})
        }
    }else if(userId && productId){
      console.log("if 5")
      const reviews = await Reviews.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });
      if(reviews.length > 0){
        console.log("if 6")
        return res.status(200).send(reviews);
      } else{
        return res.status(404).send({message: 'Review not found product and user'})
      }
    }else{
      const reviews = await Reviews.findAll();
      if(reviews.length > 0){
        console.log("if 7")

      return  res.status(200).send(reviews);
      }

    }
    //Ver todas las reviews
  } catch (error) {
    next(error);
    
  }
}

module.exports = { getReviews };
