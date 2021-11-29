const { Router } = require("express");
const router = Router();
const { Pago } = require("../controllers/mercadoPago/mercadoPago");
const { getInfoPago } = require("../controllers/mercadoPago/getInfoPago");

router.get("/", Pago);
router.get("/pago", getInfoPago);

module.exports = router;
