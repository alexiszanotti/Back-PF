const { Product, Collection } = require("../db");

async function createProduct(req, res, next) {
  try {
    const { productName, listingPrice, salePrice, discount, images, description, collection } =
      req.body;
    const newProduct = await Product.create({
      productName,
      listingPrice,
      salePrice,
      discount,
      images,
      description,
    });
    const newCollection = await Collection.findOrCreate({ where: { name: collection } });

    await newProduct.setCollection(newCollection[0]);

    res.status(200).json(newProduct);
  } catch (err) {
    next(err);
  }
}

module.exports = { createProduct };
