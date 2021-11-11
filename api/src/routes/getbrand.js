const { Router } = require('express');
const router = Router();
 const { getProductsDataBase } = require('../controllers/getproductsinfo');
 const{ Collection } = require("../db") 


router.get("/categories", async (req, res, next) => {
    try {
        let categories = await Collection.findAll({
            attributes: ['name'],
        })
        if(categories){
           return res.status(200).send(categories)
        }else{
            return res.status(404).send("categories were not found")
        }

    } catch (error) {
        console.log(error)
    } 
});

router.get("/categories/size", async (req, res, next) => {
    try {
       let products = await getProductsDataBase()
       const { size } = req.query;
       if(size === "ALL"){
           return res.status(200).send(products);
       }
        else if(size && size !== "ALL"){
            let productFound = products.filter(e => {
               return e.Sizes[0].number.toString() === size.toString()
              });
           
            if (!productFound.length) {
                return res.status(400).send('there is no such product id')
                
            }else {
                return res.status(200).send(productFound);
                
            }
            
           
        }else{
            return res.status(404).send("There is no product with that size or the size was sent incorrectly")
        }

    } catch (error) {
        console.log(error)
    } 
});

router.get("/categories/gender", async (req, res, next) => {
    try {
       let products = await getProductsDataBase()
       const { gender } = req.query;
       if(gender === "ALL"){
        return res.status(200).send(products);
    }
        else if(gender && gender !== "ALL"){
            const productFound = products.filter(e => {
                return e.productName.toLocaleLowerCase().includes(gender.toLocaleLowerCase());
              });
            
            
            if (!productFound.length) {
                return res.status(400).send('No product with that genre was found')
                
            }else {
                return res.status(200).send(productFound);
                
            }
            
           
        }else{
            return res.status(404).send("There is no product with that gender or the gender was sent incorrectly")
        }

    } catch (error) {
        console.log(error)
    } 
});
router.get("/categories/collection", async (req, res, next) => {
    try {
        let products = await getProductsDataBase()
        const { collection } = req.query;
        if(collection === "ALL"){
            return res.status(200).send(products);
        }
        if(collection && collection !== "ALL"){

            const productFound = products.filter(e => {
                return  e.collection.name.toLocaleLowerCase().includes(collection.toLocaleLowerCase()); 
              });
            
            
            if (!productFound.length) {
                return res.status(400).send('No Product Was Found With That Brand')
                
            }else {
                return res.status(200).send(productFound);
                
            }
            
           
        }else{
            return res.status(404).send("There is no product with that collection or the collection was sent incorrectly")
        }


    } catch (error) {
        console.log(error)
    } 
});

module.exports = router;