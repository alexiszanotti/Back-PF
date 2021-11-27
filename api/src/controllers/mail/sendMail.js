const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//add product to favorite
const { User, Product } = require("../../db");

async function sendToMail(req, res, next) {
  
  try {
    
    const { email, type } = req.body;

    if(!email || !type) return res.status(400).send({data: "campos vacios"})
    
    // img[0] = imagen de compra concretada / img[1] = imagen de despacho de productos
    let img = [
      
      "https://document-export.canva.com/hrFLs/DAEw8ohrFLs/77/thumbnail/0001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20211127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211127T042728Z&X-Amz-Expires=64522&X-Amz-Signature=a2892f75d48279badb0a77df29da358b8f6c19a6d6513180e4da6d6e17a96be8&X-Amz-SignedHeaders=host&response-expires=Sat%2C%2027%20Nov%202021%2022%3A22%3A50%20GMT", 
      "https://document-export.canva.com/ky5Wk/DAEw8hky5Wk/6/thumbnail/0001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20211127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211127T112840Z&X-Amz-Expires=38888&X-Amz-Signature=5861a4828a6857e6a282d86221e07becd5e34530cc36ffcf1ef5039ffd598099&X-Amz-SignedHeaders=host&response-expires=Sat%2C%2027%20Nov%202021%2022%3A16%3A48%20GMT"
    
    ]

    const msg = {

      to: email,
      from: "enzo.vazquez.388@gmail.com",
      subject: "Compra desde E-commerce PF",
      html: type === 'concretado' ? `<img src='${img[0]}' alt='alternatetext'>` : `<img src='${img[1]}' alt='alternatetext'>`,
    
    };
    
    const msgSend = await sgMail.send(msg);

    return res.status(200).send(msgSend)
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = { sendToMail };

