const { User } = require("../db");

async function updateUser(req, res, next) {
  const { id, userName, name, lastName, birthDay, password, gender, type } = req.body;

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) return res.status(404).json("user not found");

    //si el usuario es de tipo admin se le permite crear
    user.update({ userName, name, lastName, birthDay, password, gender, type });

    return res.status(200).json("user updated");
  } catch (err) {
    next(err);
  }
}

module.exports = { updateUser };
