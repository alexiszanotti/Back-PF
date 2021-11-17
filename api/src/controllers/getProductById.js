const { Product, Collection, Size, Reviews } = require("../db");

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      let productFound = await Product.findOne({
        where: { id },
        include: {
          model: Collection,
          Size,
          Reviews,
        },
      });
      return res.send(productFound);
    }
  } catch (e) {
    return res.status(400).send({ e: "Id incorrecto" });
  }
};
module.exports = { getProductById };
