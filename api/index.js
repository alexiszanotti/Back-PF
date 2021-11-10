const e = require("cors");
const server = require("./src/app.js");
const { conn, Product, Brand, Size, User } = require("./src/db.js");
const adidasInfo = require("./src/parseJson/parsejson.js");

conn.sync({ force: true }).then(() => {
  //createDB();
  server.listen(3001, () => {
    createDB();
    console.log("%s listening at 3001");
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



 
  let size1 = await Size.create({
    number: 35
  })

  for (let e of adidasInfo) {
    const { ProductID, ProductName, ListingPrice, SalePrice, Discount, Images, Description, Brand: category } = e;

    const auxProduct = await Product.create({
      productID: ProductID,
      productName: ProductName,
      listingPrice: ListingPrice,
      salePrice: SalePrice,
      discount: Discount,
      images: JSON.parse(Images), //convertir el texto de Images a un array
      description: Description,
    }).then(async product => {
     await Brand.findOne({ where: { name: category } }).then(brand => {
        product.setBrand(brand);
        product.addSize(size1)
      })
    })

  }

  await User.create({

    userName: 'Abraham',
    password: '1234admin',

  })  
};
