const { Router } = require("express");
const router = Router();
const { getAllOrders } = require("../controllers/Orders/getAllOrders");
const { getOrderByCartId } = require("../controllers/Orders/getOrderByCartId");
const { getOrderByStatus } = require("../controllers/Orders/getOrderByStatus");
const { updateStatusOrder } = require("../controllers/Orders/updateStatusOrder");

router.get("/", getAllOrders);
router.get("/cart", getOrderByCartId);
router.get("/status", getOrderByStatus);
router.patch("/", updateStatusOrder);

module.exports = router;
