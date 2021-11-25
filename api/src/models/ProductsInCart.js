const { DataTypes } = require("sequelize");
const { Product } = require("./Product");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define("ProductsInCart", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dateOfPurchase: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
