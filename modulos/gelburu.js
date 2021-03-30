const axios = require('axios');

module.exports = async function gelbooru(tag){
  try{
    tag = tag.replace("/g ","");
    var response = await axios.get(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=100&pid=0&tags=${tag}&json=1&api_key=${process.env.TOKENGEL}&user_id=418735`);
    //response = Object.values(response);
    const largo = Object.keys(response.data).length;
    const randomNumber = randomIntByMax(largo-1);
    console.log(randomNumber)
    console.log(response.data[randomNumber].source);
    return response.data[randomNumber];
    
  }
  catch(error){
    console.log(error);
  }
}

function randomIntByMax(n){
  return Math.floor(Math.random() * (n + 1))
}