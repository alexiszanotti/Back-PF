const { Product, Collection } = require("../db");

async function getProductsDataBase() {
  let products = await Product.findAll({
    limit: 350,
    attributes: [
      "id",
      "productName",
      "listingPrice",
      "salePrice",
      "discount",
      "description",
      "images",
      "gender"

    ],
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
