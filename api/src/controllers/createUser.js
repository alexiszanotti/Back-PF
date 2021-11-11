const { User } = require('../db');

module.exports = async function createUser(req, res, next) {
    const { id, userName, name, lastName, birthDay, password, gender, type } = req.body;
    let user = undefined;
    try {

        try { ////verificamos si el usuario existe y si Id es valido
            user = await User.findOne({ where: { id } });
        }   
             
         catch (error) {
           
             return res.status(404).json("error getting auth check your params ");
         }
        
        if (user?.type === "Admin") { //si el usuario es de tipo admin se le permite crear
            User.create({userName, name, lastName, birthDay, password, gender, type })
            return res.status(200).json("user created")
        }

        return res.status(500).json("user: " +user?.userName+ " Not autorized")
    }
    catch (err) {
        next(err);
    }
}