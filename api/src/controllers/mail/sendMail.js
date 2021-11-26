const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//add product to favorite
const { User, Product } = require("../../db");

async function sendToMail(req, res, next) {
  try {

    const msg = {

        to: "emanuelgermano90@gmail.com",
        from: "emanuel_cl87@hotmail.com",
        subject: "mensaje prueba",
        text: "creo que este es el campo del mensaje",
        html: "<strong>creo que este es el campo del mensaje</strong>",
    
    };
    
    const verdura = await sgMail.send(msg);

    console.log(verdura)

    // return res.status(200).send(verdura)
    
  } catch (error) {
    next(error)
  }
}

module.exports = { sendToMail };

