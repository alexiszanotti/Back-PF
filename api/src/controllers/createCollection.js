const { Collection } = require("../db");

async function createCollection(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        Error: "El Nombre es requerido",
      });
    }
    const collection = await Collection.create({
      name,
    });
    return res.status(201).send({
      collection,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createCollection };
