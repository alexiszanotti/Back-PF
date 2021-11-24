const { Product, Collection, Reviews } = require("../../db");

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      let productFound = await Product.findOne({
        where: { id },
        include: {
          model: Collection,
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
