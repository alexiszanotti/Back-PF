const { Router } = require('express');
const router = Router();

const createProduct = require('../controllers/createProduct');

router.post('/createProduct', createProduct);

//router.post('./editProduct', editProduct);


module.exports = router;