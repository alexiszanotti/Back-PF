
const { Product, Brand } = require('../db'); 

module.exports = async function createProduct (req,res,next) {
try  { 
    console.log('en products');
    const {productName, listingPrice, salePrice, discount, images, description, brand} = req.body;
    const newProduct = await Product.create({
        productName,
        listingPrice,
        salePrice,
        discount,
        images,
        description,
    });
    const newBrand = await Brand.findOrCreate({where: {name: brand}});

    await newProduct.setBrand(newBrand[0]);
    
    res.status(200).json(newProduct);
}
catch (err){
    next(err);
}
}

