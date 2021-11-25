const { Cart, User } = require("../../db");

async function getCartByUser(req, res, next) {
  const { userId } = req.query;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id", "name"],
      include: [
        {
          model: Cart,
          attributes: ["id"],
        },
      ],
    });
    if (!user) {
      return res.status(404).send({
        message: "No se encontraron usuarios con ese ID.",
      });
    }
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}

module.exports = { getCartByUser };
