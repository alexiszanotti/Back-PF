const e = require("cors");
const server = require("./src/app.js");
const { conn, Product, Brand, Size, User } = require("./src/db.js");
const adidasInfo = require("./src/parseJson/parsejson.js");

conn.sync({ force: true }).then(() => {
  //createDB();
  server.listen(3001, async () => {
    console.log("Espere a que se cree la base de datos..");
    console.time("Se creo la base de datos con exito")
    try {
     await createDB();
      console.timeEnd("Se creo la base de datos con exito")
      console.log("%s listening at 3001");
    } catch (error) {
      console.log(error,"No se pudo crear la base de datos ")
    }
  });
});


///create DB from json file
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

  //create admin user for testing 
  await User.create({
    email: "admin@email.com",
    userName: "admin",
    password: "admin",
    type: "Admin",
    name: "adminTest",
    lastName: "adminLastname",
    birthDay: "2000-01-01",
    gender: "Other",

  })



};

