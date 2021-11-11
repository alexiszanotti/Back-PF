const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
 
   id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true
   },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    listingPrice: {
      type: DataTypes.DECIMAL(10, 2), // 10 precision, 2 decimales
      allowNull: false,
    },
    salePrice: {
      type: DataTypes.DECIMAL(10, 2), // 10 precision, 2 decimales
      allowNull: false,
    },
    //crear descuento con limite entre 0 y 100
    discount: {
      type: DataTypes.DECIMAL(10, 2), // 10 precision, 2 decimales
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    //images es un arreglo de strings
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  

  });
};
