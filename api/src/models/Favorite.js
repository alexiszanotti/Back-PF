const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  // defino el modelo
  sequelize.define("favorite", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
  });
  {
    timestamps: false;
  }
};
