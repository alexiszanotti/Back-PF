const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define("order", {
    id: {
      //add uui
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    payment_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    payment_status: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });
};
