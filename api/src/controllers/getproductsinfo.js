const { Product, Brand } = require('../db'); 


async function getProductsDataBase() {
       try {
           let products = await Product.findAll({
            include: [
                {
                    model: Brand,
                    attributes: ['name']
                }
            ]
           });
           
           return products
           
       } catch (error) {
           console.log(error)
       } 


}
module.exports = {
    getProductsDataBase
}



