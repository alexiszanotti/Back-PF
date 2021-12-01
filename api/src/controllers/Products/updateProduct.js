const { Product, Collection } = require("../../db");

async function updateProduct(req, res, next) {
  try {
    const { id, productName, salePrice, images, description, collection, stock, gender } = req.body;

    const product = await Product.findOne({ where: { id } });

    if (!product) return res.status(404).send({ message: "Product not found" });
    await product.update({
      productName,
      salePrice,
      images,
      description,
      stock,
      gender,
    });

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
