const { Router } = require('express');
const router = Router();

const createUser = require('../controllers/createUser');
const updateUser = require('../controllers/updateUser');
const loginUser = require('../controllers/loginUser');

router.post('/createUser', createUser);
router.post('/updateUser', updateUser);
router.post('/loginUser', loginUser);


module.exports = router;