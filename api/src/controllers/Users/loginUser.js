const { User } = require("../../db");

async function loginUser(req, res, next) {
  const { email } = req.body;
  try {
    if(email){
      const user = await User.findOne({ where: { email } });

    if (!user){
      return res.status(404).json("El usuario no existe");
    } else {
      const userRes = {
        email: user.email,
        id: user.id,
        type: user.type,
      };
  
      return res.status(200).json(userRes);
    }

    }else {
      return res.status(404).json({msg: "no hay email"});

    }
    
  } catch (err) {
    next(err);
  }
}

module.exports = { loginUser };
