

const {
    PROD_ACCESS_TOKEN,
  } = process.env;


const mercadopago = require ('mercadopago');

const Pago = async (req, res,next) => {
    try{



    }catch(error){
        next(error);
    }
}

module.exports = {Pago};
