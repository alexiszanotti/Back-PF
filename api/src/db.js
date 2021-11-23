// require('dotenv').config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
        logging: false,
        native: false,
        define: {
          timestamps: false,
        },
      });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Product, Favorite, ProductSold, SaveProducts, Cart, Collection, Reviews, User } =
  sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Product.belongsTo(Collection); // El producto pertenece a colecciones
Collection.hasMany(Product); // las colecciones tiene muchos productos

Product.belongsToMany(User, { through: "user_products" });
User.belongsToMany(Product, { through: "user_products" });

Product.hasMany(SaveProducts); // El producto tiene muchos productos guardados.
SaveProducts.belongsTo(Product); // El producto guardado  pertenece a producto

User.hasMany(SaveProducts); // El usuario tiene muchos productos guardados
SaveProducts.belongsTo(User); // El producto guardado  pertenece a Usuario

User.belongsTo(Cart); // El usuario tiene un  carrito
Cart.hasMany(User); // El carrito pertenece a Usuario

Cart.hasMany(ProductSold); // El carrito tiene muchos productos vendidos
ProductSold.belongsTo(Cart); // El producto vendido pertenece al carrito

Cart.belongsTo(Product);
Product.hasMany(Cart); // El carrito tiene muchos productos favoritos

Product.hasMany(ProductSold); // El producto tiene muchos productos vendidos
ProductSold.belongsTo(Product); // El producto vendido pertenece al producto

Reviews.belongsTo(ProductSold); // las reseñas pertenecen al producto vendido
ProductSold.hasMany(Reviews); // el producto vendido tiene muchas reseñas

Favorite.belongsTo(User);
User.hasMany(Favorite);

Favorite.belongsTo(Product);
Product.hasMany(Favorite);

// El usuario tiene un favorito
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
