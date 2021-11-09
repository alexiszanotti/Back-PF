const server = require("./src/app.js");
const { conn, Product, Brand } = require("./src/db.js");
const catalogProducts = require("./src/parseJson/parsejson.js");

conn.sync({ force: true }).then(() => {
  //createDB();
  server.listen(3001, () => {
    
    console.log(catalogProducts[0]["Product ID"]);
    console.log("%s listening at 3001 bla bla");
  });
});

const createDB = async () => {
  // catalogProducts.forEach(product => {
  //   const { ProductID, ProductName, ListingPrice, SalePrice, Discount, Images, Description, Brand } = product;
  //     product.create({
  //       productID: ProductID,
  //       productName: ProductName,
  //       listingPrice: ListingPrice,
  //       salePrice: SalePrice,
  //       discount: Discount,
  //       images: Images,
  //       description: Description,
  //   }).then(e=> e.addBrand(Brand));
  //});
};
