const { Product } = require("../db");

async function filterPrice(req, res) {
  try {
    const { order } = req.query;
    if (order === "ASC") {
      const products = await Product.findAll({
        order: [["salePrice", "ASC"]],
      });
      res.status(200).send(products);
    } else if (order === "DESC") {
      const products = await Product.findAll({
        order: [["salePrice", "DESC"]],
      });
      res.status(200).send(products);
    } else {
      res.status(400).send({ Error: "Invalid order" });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Internal server error",
    });
  }
}

module.exports = { filterPrice };
