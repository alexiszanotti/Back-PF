const { User } = require("../db");

async function getAllUsers(req, res, next) {
  const { id } = req.body;
  try {
    if (id) {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      res.status(200).send(user);
    } else {
      const users = await User.findAll({
        attributes: ["id", "name", "lastName", "email", "type", "birthDay", "gender"],
      }).then(users => {
        res.status(200).send(users);
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUsers };
