const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            //add uui
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },  
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        birthDay: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender:{
            type: DataTypes.ENUM('Male', 'Female', 'Other')
        }, 
        type: {
            type: DataTypes.ENUM('Admin', 'User'),
            allowNull: false,
        },
    });
}
