const { Router } = require("express");
const router = Router();
const {mercadoPago} = require("../controllers/mercadoPago/mercadoPago");


router.get("/", mercadoPago);