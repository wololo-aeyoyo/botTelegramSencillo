const axios = require('axios');

module.exports = function gelbooru(tag = ''){
  return new Promise(async (resolve, reject) => {
    try {
      const _tag = tag.replace("/g ","");
      var apiResponse = await axios.get(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=100&pid=0&tags=${_tag}&json=1&api_key=${process.env.TOKENGEL}&user_id=418735`);
      //apiResponse = Object.values(apiResponse);
      const largo = Object.keys(apiResponse.data).length;
      const randomNumber = randomIntByMax(largo-1);
      console.log(randomNumber)
      console.log(apiResponse.data[randomNumber].source);
      resolve(apiResponse.data[randomNumber]);
      
    }
    catch(error){
      console.log(error);
      reject(error);
    }
  })
}

function randomIntByMax(n){
  return Math.floor(Math.random() * (n + 1))
}