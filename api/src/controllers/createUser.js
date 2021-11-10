const { User } = require('../db');

module.exports = async function createUser(req, res, next) {
    try {
        const { userName, name, lastName, birthDay, password, gender, type} = req.body;
        res.status(200).json(response)
    }
    catch (err) {
        next(err);
    }
}