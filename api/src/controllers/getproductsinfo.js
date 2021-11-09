const { Product, Brand } = require('../db'); 


async function getProductsDataBase() {
       try {
           let products = await Product.findAll({
               attributes: ['productID', 'productName', 'listingPrice', 'salePrice', 'discount ', 'description', 'images', ],
               include: {
                   model: Brand,
                   attributes: ['name'],
                   through: {
                       attributes: []
                   }
               } 
           });
           console.log(recetas)
           return products
           
       } catch (error) {
           console.log(error)
       } 


}
module.exports = {
    getProductsDataBase
}



