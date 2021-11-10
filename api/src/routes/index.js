const { Router  } = require('express');
const express = require('express');
const getAllUsersRoute = require('./getAllUsersRoute');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getproducts = require("./getproducts")
const getproductsbyid = require("./getproductsbyid")
const getbrand= require("./getbrand")
const postEditProducts = require("./postEditProducts")


const router = Router();
router.use(express.urlencoded({ extended: true, limit: '50mb' }));
router.use(express.json({ limit: '50mb' }));
// Configurar los routers
router.use('/', getproducts);
router.use('/', getproductsbyid);
router.use('/', getbrand);
router.use('/', getAllUsersRoute);
router.use('/', postEditProducts);

module.exports = router;
