const { Router } = require("express");
const { getProductsDataBase } = require("../controllers/getproductsinfo");

const router = Router();

router.get("/products", async (req, res, next) => {
  try {
    const products = await getProductsDataBase();

    const { name, gender, collection,  } = req.query;
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
    next(error);
  }
});

module.exports = router;
