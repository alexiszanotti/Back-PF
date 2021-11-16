const { Router } = require("express");
const express = require("express");
const usersRoute = require("./usersRoute");
const productsRoute = require("./productsRoute");
const categoriesRoute = require("./categoriesRoute");
const reviewsRoute = require("./reviewsRoute");

const router = Router();
router.use(express.urlencoded({ extended: true, limit: "50mb" }));
router.use(express.json({ limit: "50mb" }));
// Configurar los routers
router.use("/products", productsRoute);
router.use("/users", usersRoute);
router.use("/categories", categoriesRoute);
router.use("/reviews", reviewsRoute);

module.exports = router;
