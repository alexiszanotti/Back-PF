const { User } = require("../db");
module.exports = updateUser = async (req, res, next) => {

    const { userName, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { userName, password } });
  
      if (!user) return res.status(404).json("user not found");
  
  
      return res.status(200).json("true");
    } catch (err) {
      next(err);
    }
  };