const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Size', {
        id: {
            //add uui
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },   
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },


    });
}