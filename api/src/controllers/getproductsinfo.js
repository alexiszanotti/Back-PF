const { Product, Brand } = require('../db'); 


async function getProductsDataBase() {
       try {
           let products = await Product.findAll({

                attributes: ['id', 'productName', 'listingPrice', 'salePrice', 'discount', 'description', 'images', ], 
                include: [

                    {
                        model: Brand,
                        attributes: ['name'],
                         
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



