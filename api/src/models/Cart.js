const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define("Cart", {
    id: {
      //add uui
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Mercado Pago",
    },
    dateOfPurchase: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    confirmationDate: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    dateCancellation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },

    status: {
      type: DataTypes.ENUM("PENDING", "PROCESSING", "CANCELED", "COMPLETED"),
      defaultValue: "PENDING",
      allowNull: false,
    },
  });
};
