const { User } = require("../../db");

async function updateUser(req, res, next) {
  const {
    id,
    email,
    name,
    lastName,
    birthDay,
    gender,
    type,
    address,
    cp,
    telephone,
    number,
    location,
    document,
    province,
    floor,
    department,
  } = req.body;

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) return res.status(404).json("user not found");
    else {

      //si el usuario es de tipo admin se le permite crear
      let usDB = await user.update({
        email,
        name,
        lastName,
        birthDay,
        gender,
        type,
        address,
        cp,
        telephone,
        number,
        location,
        document,
        province,
        floor,
        department,
      });

      if(usDB.length > 0 ) return res.status(200).json(usDB);
      else return res.status(400).json({msg: "error al modificar"})
      

    }
    
  } catch (err) {
    next(err);
  }
}

module.exports = { updateUser };
