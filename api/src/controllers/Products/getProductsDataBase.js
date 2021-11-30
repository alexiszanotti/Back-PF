const { Product, Collection } = require("../../db");

async function getProductsDataBase() {
  let products = await Product.findAll({
    attributes: ["id", "productName", "salePrice", "description", "images", "gender", "stock"],
    include: [
      {
        model: Collection,
        attributes: ["name"],
      },
    ],
  });
  return products;
}

module.exports = { getProductsDataBase };
