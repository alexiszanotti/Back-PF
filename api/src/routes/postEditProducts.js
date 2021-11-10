const { Router } = require('express');
const router = Router();

const createProduct = require('../controllers/createProduct');
const updateProduct = require('../controllers/updateProduct');

router.post('/createProduct', createProduct);
router.post('/updateProduct', updateProduct);

//router.post('./editProduct', editProduct);


module.exports = router;