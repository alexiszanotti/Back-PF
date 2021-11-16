const { Product, Collection, Size, Reviews } = require("../db");

async function getProductsDataBase(req, res) {
  try {
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
      ],
      include: [
        {
          model: Collection,
          attributes: ["name"],
        },
        {
          model: Size,
          attributes: ["number"],
        },
        {
          model: Reviews,
          attributes: ["score", "review"],
        },
      ],
    });

    const { name } = req.query;
    if (name) {
      const products_Found = products.filter(e => {
        return e.productName.toLocaleLowerCase().includes(name.toLocaleLowerCase());
      });

      if (!products_Found.length) {
        return res.status(404).send({ msg: "Products not found" });
      }
      return res.status(200).send(products_Found);
    } else {
      return res.status(200).send(products);
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getProductsDataBase,
};
