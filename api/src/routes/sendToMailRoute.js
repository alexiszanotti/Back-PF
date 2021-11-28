const { Router } = require("express");
const {sendToMail} = require("../controllers/mail/sendMail");
const router = Router();


router.post("/", sendToMail);

module.exports = router;