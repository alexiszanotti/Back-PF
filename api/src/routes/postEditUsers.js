const { Router } = require('express');
const router = Router();

const createUser = require('../controllers/createUser');
const updateUser = require('../controllers/updateUser');

router.post('/createUser', createUser);
router.post('/updateUSer', updateUser);

module.exports = router;