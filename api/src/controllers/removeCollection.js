const { Collection } = require("../db");

async function removeCollection(req, res) {
    try {
      const { name } = req.body;

      await Collection.destroy(
        {
          where: {
            name: name,
          },
        }
      );
  
      return res.status(200).send("categoria eliminada");
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports = { removeCollection };