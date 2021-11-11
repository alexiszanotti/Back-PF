const { User } = require('../db'); 

module.exports = updateUser = async (req,res,next) => {
    const { id, userName, name, lastName, birthDay, password, gender, type } = req.body;
    let user = undefined;
    try {

        try { ////verificamos si el usuario existe y si Id es valido
            user = await User.findOne({ where: { id } });
        }   
             
         catch (error) {
           
             return res.status(404).json("error getting auth check your params ");
         }
        const user = await User.findOne({ where: { userToEditId } });

        if (!user) return res.status(404).json("user not found");

        if (user?.type === "Admin") { //si el usuario es de tipo admin se le permite crear
            user.update({userName, name, lastName, birthDay, password, gender, type })
            return res.status(200).json("user updated")
        }

        return res.status(500).json("user: " +user?.userName+ " Not autorized")
    }
    catch (err) {
        next(err);
    }
}