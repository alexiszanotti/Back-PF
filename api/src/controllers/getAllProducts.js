const { getProductsDataBase } = require("./getProductsDataBase");

async function getProducts(req, res, next) {
  const { name } = req.query;
  try {
    const allProducts = await getProductsDataBase();
    if (name && allProducts) {
      const products = allProducts.filter(product =>
        product.productName.toLowerCase().includes(name.toLowerCase())
      );
      res.status(200).json(products);
    } else if (allProducts) {
      res.status(200).send(allProducts);
    } else {
      res.status(404).send("No products found");
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getProducts };
