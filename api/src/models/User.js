const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define("user", {
    id: {
      //add uui
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
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
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
    },
    type: {
      type: DataTypes.ENUM("Admin", "User", "Locked"),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
    },
    cp: {
      type: DataTypes.STRING,
    },
    telephone: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.STRING,
    },
    document: {
      type: DataTypes.INTEGER,
    },
    province: {
      type: DataTypes.STRING,
    },
    floor: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
  });
};
