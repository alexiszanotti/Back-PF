const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define("SaveProducts", {
    id: {
      //add uui
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
