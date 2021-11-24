const { User, Product, Cart } = require("../../db");
async function removeProductsFromAUsersCart(req, res, next) {
  try {
    console.log("Hasta Aca LLegue Compa Me dio sueño XD");
  } catch (error) {
    next(error);
  }
}

module.exports = { removeProductsFromAUsersCart };
