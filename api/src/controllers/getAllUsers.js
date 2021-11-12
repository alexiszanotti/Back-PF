const { User, conn } = require("../db");



const getAllUsers = async () => {

    let allUser = await User.findAll({

        attributes: ['id', 'userName','name','lastName', 'birthDay', 'password', 'gender', 'type'],

    })

    return allUser
}

module.exports = getAllUsers;
