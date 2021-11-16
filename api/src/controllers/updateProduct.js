const { Product, Collection } = require("../db");

async function updateProduct(req, res, next) {
  try {
    const { id, productName, listingPrice, salePrice, discount, images, description, collection } =
      req.body;

    const product = await Product.findOne({ where: { id } });

    if (!product) return res.status(404).send({ message: "Product not found" });
    await product.update({ productName, listingPrice, salePrice, discount, images, description });
    if (collection) {
      let auxcollection = await Collection.findOrCreate({ where: { name: collection } });
      async e => await product.setCollection(e);
    }

    return res.status(200).send({ message: "Product updated" });
  } catch (error) {
    next(error);
  }
}

module.exports = { updateProduct };
