const axios = require('axios');

module.exports = async function dollar(cantidad=1){
  try{
    if (cantidad != "/dolar") {var cantidad = parseFloat(cantidad.replace("/dolar ",""));}
    const response = await axios.get("http://s3.amazonaws.com/dolartoday/data.json");
    console.log("paopsdfasmpfd");
    return isNaN(cantidad) ? response.data.USD.transferencia : response.data.USD.transferencia  * cantidad; // operador ternario para saber si mandaron numero o no
    
  }
  catch(error){
    return error;
  }
}
