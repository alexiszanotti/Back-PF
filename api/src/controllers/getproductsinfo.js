const { Product, Collection, Size } = require('../db'); 


async function getProductsDataBase() {
       try {
           let products = await Product.findAll({
               limit: 350,

                attributes: ['id', 'productName', 'listingPrice', 'salePrice', 'discount', 'description', 'images', ], 
                include: [

                    {
                        model: Collection,
                        attributes: ['name'],
                         
                    },
                    {
                        model: Size,
                        attributes: ['number'], 
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



