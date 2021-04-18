const youtubedl = require("youtube-dl-exec");

module.exports =  function videoBajar(ctx) {
    return new Promise(async(resolve, reject)=>{
        try{
            data = await youtubedl(ctx.message.text.replace("/bajar",""),{
                f: ["bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4"],
                o:[`/videos/${ctx.message.message_id}.mp4`]
            })
            
           //path = data.match(/(?<=Destination: ).*/)
           //console.log(path[0])
            resolve(`videos/${ctx.message.message_id}.mp4`)
            

        }
        catch(error){
            console.log(error)
            reject(error)
        }
    })
}
