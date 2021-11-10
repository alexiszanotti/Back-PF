const { Product, Brand } = require('../db'); 

module.exports = async function updateProdut (req,res,next) {
    try {
        
        const {id, productName, listingPrice, salePrice, discount, images, description, brand} = req.body;
        
        const product = await Product.findOne({ where: { id } });

        if (!product) return res.status(404).send({ message: 'Product not found' });
;
        await product.update({productName, listingPrice, salePrice, discount, images, description} );
       if (brand) {
        let auxbrand = await Brand.findOrCreate({where: {name: brand}});
        async e => await product.setBrand(e);
        }
       
        
        return res.status(200).send({ message: 'Product updated' });

    } catch (error) {

        next(error);
    }
}
    