const server = require("./src/app.js");
const { conn, Product, Brand } = require("./src/db.js");
const { catalogProducts } = require("./src/parseJson/parsejson.js");

conn.sync({ force: true }).then(() => {
  //createDB();
  server.listen(3001, () => {
    createDB();
    console.log("%s listening at 3001 bla bla");
  });
});

const createDB = async () => {
  let i = 0;
  const brands = [
    'ORIGINALS',
    'CORE / NEO',
    'SPORT PERFORMANCE']
    brands.forEach(brand => {
      Brand.create({
        name: brand
      })
    })
      
  for (let e of catalogProducts) {
    const { ProductID, ProductName, ListingPrice, SalePrice, Discount, Images, Description, Brand: category } = e;

    const auxProduct = Product.create({
      productID: ProductID,
      productName: ProductName,
      listingPrice: ListingPrice,
      salePrice: SalePrice,
      discount: Discount,
      images: JSON.parse(Images), //convertir el texto de Images a un array
      description: Description,
    }).then(product => {
      Brand.findOne({ where: {name: category} }).then(brand => {
        product.setBrand(brand);
      });
    });

  }
};
