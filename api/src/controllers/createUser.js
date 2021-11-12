const { User } = require("../db");

module.exports = async function createUser(req, res, next) {
  try {
    const { userName, name, lastName, birthDay, password, gender } = req.body;

    User.create({ userName, name, lastName, birthDay, password, gender, type: "User" });

    return res.status(200).json("user created");
  } catch (err) {
    next(err);
  }
};
