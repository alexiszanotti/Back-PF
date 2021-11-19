const { DataTypes } = require("sequelize");

module.exports = sequelize => {
    sequelize.define("Trolley", {
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
        },
        dateOfPurchase: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmationDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateCancellation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dispatchDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfDelivery: {
            type: DataTypes.STRING,
            allowNull: false,
        },


    });
};
