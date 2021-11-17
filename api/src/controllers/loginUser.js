const { User } = require("../db");

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });

    if (!user) return res.status(404).json("user not found");
    const userRes = {
      email: user.email,
      id: user.id,
      type: user.type,
    };

    return res.status(200).json(userRes);
  } catch (err) {
    next(err);
  }
}

module.exports = { loginUser };
