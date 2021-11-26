const { Router } = require("express");
const router = Router();
const {sendToMail} = require("../controllers/mail/sendMail");


router.post("/", sendToMail);

module.exports = router;