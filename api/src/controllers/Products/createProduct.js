const { Product, Collection } = require("../../db");

async function createProduct(req, res, next) {
  try {
    const { productName, salePrice, images, description, collection, stock } = req.body;
    const newProduct = await Product.create({
      productName,
      salePrice,
      images,
      description,
      stock,
    });
    const newCollection = await Collection.findOrCreate({ where: { name: collection } });

    await newProduct.setCollection(newCollection[0]);

    res.status(200).json(newProduct);
  } catch (err) {
    next(err);
  }
}

module.exports = { createProduct };
