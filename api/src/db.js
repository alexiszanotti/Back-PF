require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Product, ProductSold, SaveProducts, Trolley,  Size, Collection, Reviews, User } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Product.belongsTo(Collection); // El producto pertenece a colecciones
Collection.hasMany(Product);  // las colecciones tiene muchos productos 

Product.belongsToMany(Size, {through: 'product_Size'});
Size.belongsToMany(Product, {through: 'product_Size'});

Product.belongsToMany(User, {through: 'favorite_product'});
User.belongsToMany(Product, {through: 'favorite_product'});

Product.hasMany(SaveProducts) // El producto tiene muchos productos guardados.
SaveProducts.belongsTo(Product) // El producto guardado  pertenece a producto

User.hasMany(SaveProducts) // El usuario tiene muchos productos guardados 
SaveProducts.belongsTo(User) // El producto guardado  pertenece a Usuario


User.hasMany(Trolley) // El usuario tiene muchos  carritos 
Trolley.belongsTo(User) // El carrito pertenece a Usuario

Trolley.hasMany(ProductSold) // El carrito tiene muchos productos vendidos
ProductSold.belongsTo(Trolley) // El producto vendido pertenece al carrito

Product.hasMany(ProductSold) // El producto tiene muchos productos vendidos
ProductSold.belongsTo(Product)// El producto vendido pertenece al producto

Reviews.belongsTo(ProductSold) // las reseñas pertenecen al producto vendido


// Aca vendrian las relaciones
// Product.hasMany(Reviews);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
