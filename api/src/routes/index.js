const { Router } = require('express');
const getAllUsersRoute = require('./getAllUsersRoute');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getproducts = require("./getproducts")
const getproductsbyid = require("./getproductsbyid")
const getbrand= require("./getbrand")


const router = Router();

// Configurar los routers
router.use('/', getproducts);
router.use('/', getproductsbyid);
router.use('/', getbrand);


router.use('/', getAllUsersRoute);

module.exports = router;
