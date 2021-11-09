const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('brand', {
        id: {
            //add uui
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },   
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
}