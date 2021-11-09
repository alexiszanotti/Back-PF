const { Router } = require('express');
const router = Router();
 const{ Brand } = require("../db") 


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

module.exports = router;