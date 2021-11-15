const { Collection, Size, Product } = require("../db");
const { getProductsDataBase } = require("./getproductsinfo");

const categories = async (req, res, next) => {
    try {
      let categories = await Collection.findAll({
        attributes: ["name"],
      });
      if (categories) {
        return res.status(200).send(categories);
      } else {
        return res.status(404).send("categories were not found");
      }
    } catch (error) {
      next(error);
    }
  }

const size  = async (req, res, next) => {
    try {
        let products = {};

      const { size } = req.query;

      if (size === "All") {
        products = await Size.findAll({include: {model: Product, attributes: ['productName'] }});
        return res.status(200).send(products);

      } else if (size && size !== "All") {
       
       products = await Size.findAll({where: {number:size}, include:{model: Product, attributes: ['productName'] }});
  
                if (!products.length) {
                return res.status(400).send("No hay productos con ese talle");

                } 
                else {
                return res.status(200).send(products);
                }
                
      } else {
        return res.status(406).send("No se recibieron parametros para realizar la busqueda");
        
      }
    } catch (error) {
      next(error);
    }
  };
  
  const gender = async (req, res, next) => {
    try {
        const { gender } = req.query;

      let products = await getProductsDataBase();

      
      if (gender === "All") {
        return res.status(200).send(products);
      }
      if (gender && gender !== "All") {

        const productFound = await products.filter(e => {
            console.log(e.productName)
          return e.productName.toLowerCase().charAt(0) === gender.toLowerCase().charAt(0);

        });
  
        if (!productFound.length) {
          return res.status(400).send("No se encontraron productos con ese genero");
        } else {
          return res.status(200).send(productFound);
        }
      } else {
        return res.status(404).send("There is no product with that collection or the gender was sent incorrectly");
      }
    } catch (error) {
      next(error);
    }
  }

  const collection = async (req, res, next) => {
    
        try {
          
       Collection.findAll().then(e => res.status(200).send(e));
          
        } catch (error) {
          next(error);
        }
      };
  
  

  module.exports = {categories, size, gender, collection}