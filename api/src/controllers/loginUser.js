const { User } = require("../db");

async function loginUser(req, res, next) {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ where: { userName, password } });

    if (!user) return res.status(404).json("user not found");
    const userRes = {
      userName: user.userName,
      id: user.id,
      type: user.type,
    };

    return res.status(200).json(userRes);
  } catch (err) {
    next(err);
  }
}

module.exports = { loginUser };
