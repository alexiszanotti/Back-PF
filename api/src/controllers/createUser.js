const { User } = require("../db");

async function createUser(req, res, next) {
  try {
    const { email, name, lastName, birthDay, password, gender } = req.body;

    User.create({ email, name, lastName, birthDay, password, gender, type: "User" });

    return res.status(200).json("user created");
  } catch (err) {
    next(err);
  }
}
module.exports = { createUser };
