const { Router } = require('express');
const router = Router();
 const{ Brand } = require("../db") 
 const { getProductsDataBase } = require('../controllers/getproductsinfo');


router.get("/categories", async (req, res, next) => {
    try {
        let categories = await Brand.findAll({
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
        if(size){
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
        if(gender){


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
router.get("/categories/brand", async (req, res, next) => {
    try {
        let products = await getProductsDataBase()
        const { brand } = req.query;
        console.log(brand)
        console.log(products[0].brand.name)
        if(brand){

            const productFound = products.filter(e => {
                return  e.brand.name.toLocaleLowerCase().includes(brand.toLocaleLowerCase()); 
              });
            
            
            if (!productFound.length) {
                return res.status(400).send('No Product Was Found With That Brand')
                
            }else {
                return res.status(200).send(productFound);
                
            }
            
           
        }else{
            return res.status(404).send("There is no product with that brand or the brand was sent incorrectly")
        }


    } catch (error) {
        console.log(error)
    } 
});

module.exports = router;