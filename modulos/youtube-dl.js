const youtubedl = require("youtube-dl-exec");
const fs = require('fs');

module.exports =  function videoBajar(ctx) {
    return new Promise(async(resolve, reject)=>{
        try{
            data = await youtubedl(ctx.message.text.replace("/bajar",""),{
                f: ["bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4"],
                o:[`./tmp/${ctx.message.message_id}.mp4`]
            })
            

            fs.readdir("./tmp/", (err, files) => {
                files.forEach(file => {
                  console.log(file);
                });
              });
           path = data.match(/(?<=Destination: ).*/)
           console.log(path[0])
            resolve(`tmp/${ctx.message.message_id}.mp4`)
            

        }
        catch(error){
            console.log(error)
            reject(error)
        }
    })
}
