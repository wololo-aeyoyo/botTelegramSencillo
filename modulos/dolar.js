const axios = require('axios');
const { patrificarDolares } = require('../modulos/intl');

module.exports = function dollar(comando) {
  return new Promise(async (resolve, reject) => {
    console.log("/dolar");
    try {
      let response = '', cantidad = 1;
      if (comando != "/dolar") { 
        cantidad = parseFloat(comando.replace("/dolar ","")); 
        response = `${cantidad} dolares son: `
      }
      const apiResponse = await axios.get("http://s3.amazonaws.com/dolartoday/data.json");
      if (apiResponse.status === 200) {
        response += patrificarDolares(apiResponse.data.USD.transferencia  * cantidad);
      }
      resolve(response); 
    }
    catch(error){
      reject(error);
    }
  });
}
