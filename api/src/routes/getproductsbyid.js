const { Router } = require('express');
const router = Router();
const { getProductsDataBase } = require('../controllers/getproductsinfo');

router.get('/products/:id', async (req, res) => {

    const { id } = req.params;
    const products = await getProductsDataBase()
    console.log(id,"it went through params")
    try {
        if (id) {
            
            let productFound = products.filter(e => {
                return e.id == id
              });
            
            
            if (productFound.length === 0) {
                return res.status(400).send('there is no such product id')
                
            }else {
                return res.status(200).send(productFound);
                
            }
            

        };
    }
    catch (e) {
        return res.status(400).send({ msg: "Id incorrecto" });
    }

})

module.exports = router;
