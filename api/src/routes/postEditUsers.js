const { Router } = require('express');
const router = Router();

const createUser = require('../controllers/createUser');
//const updateProduct = require('../controllers/updateUser');

router.post('/createUser', createUser);

module.exports = router;