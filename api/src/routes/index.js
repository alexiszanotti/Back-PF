const { Router } = require("express");
const express = require("express");
const getAllUsersRoute = require("./getAllUsersRoute");
const getproducts = require("./getproducts");
const getproductsbyid = require("./getproductsbyid");
const getbrand = require("./getbrand");
const postEditProducts = require("./postEditProducts");
const postEditUsers = require("./postEditUsers");
const getReviews = require("./getReviews");
const postReviews = require("./postReviews");

const router = Router();
router.use(express.urlencoded({ extended: true, limit: "50mb" }));
router.use(express.json({ limit: "50mb" }));
// Configurar los routers
router.use("/", getproducts);
router.use("/", getproductsbyid);
router.use("/", getbrand);
router.use("/", getAllUsersRoute);
router.use("/", postEditProducts);
router.use("/", postEditUsers);
router.use("/", getReviews);
router.use("/", postReviews);
module.exports = router;
