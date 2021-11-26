const { Router } = require("express");
const router = Router();
const { Pago } = require("../controllers/mercadoPago/mercadoPago");

router.get("/", Pago);

module.exports = router;
