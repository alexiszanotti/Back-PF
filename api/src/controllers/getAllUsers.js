const { User } = require("../db");

async function getAllUsers(req, res, next) {
  const { id } = req.body;
  try {
    if (id && id !== "") {
      const user = await User.findOne({
        where: {
          id: id,
        },
      });
      res.status(200).send(user);
    } else {
      const users = await User.findAll({
        attributes: ["name", "lastName", "birthDay", "email", "userName", "type"],
      });
      res.status(200).send(users);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = { getAllUsers };
