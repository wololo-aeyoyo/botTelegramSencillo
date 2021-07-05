const { Telegraf, Context } = require("telegraf")
const getDollar = require("./modulos/dolar");
const getBooru = require("./modulos/gelburu");
const getVideo = require("./modulos/youtube-dl");
const commandArgsMiddleware = require('./modulos/exponerComandos')
const fs = require('fs')


process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const development = process.env.NODE_ENV;
if (development) {
    require('dotenv').config()
}

const bot = new Telegraf(process.env.TOKENTELEGRAM);
bot.use(commandArgsMiddleware());

bot.start((ctx)=>{  
    ctx.reply("Epale");
})

// Kuek
bot.hears(/(gabriel)/gmi, ctx =>{
    ctx.replyWithPhoto(
        {url:"https://i2-prod.mirror.co.uk/incoming/article1448101.ece/ALTERNATES/s615b/Skeleton%20in%20Sweden"},
        {caption: "El pana @GabrielReinoza esta zeko zeko rip"}      
        );
})

bot.hears(/(marico el que lo lea)/gmi, ctx => {
    ctx.reply(`mas marico es el pana @${ctx.from.username}`);
    
});

bot.hears(/(miguel)/gmi, ctx => {
    ctx.replyWithVideo({ source: "./videos/el pana Miguel.mp4"})
    .then(ctx.reply("lo quiero mucho al pana @Miguel129"));
});

bot.hears(/(siu)/gmi, ctx => {
    ctx.replyWithVideo({ source: "./videos/siuuu.mp4"})
    .then(ctx.reply("EL BICHOOOOOOOOOOO SIUUUUUUU"));
});

bot.hears(/(el bicho)/gmi, ctx => {
    ctx.reply("EL BICHOOOOOOOOOOO SIUUUUUUU");
});

bot.hears(/(mi bicho)/gmi, ctx => {
    ctx.reply("EL BICHOOOOOOOOOOO SIUUUUUUU");
});

bot.hears([/(lol)/gmi,/(league of legends)/gmi], ctx => {
    ctx.reply(`Vamo a juga lol menores @${ctx.from.username}`);
});

bot.hears("megumi", ctx => {
    ctx.replyWithVideo(
        { source: "./videos/megumi.mp4"},
        {caption: "megumiiiiii"});
});

bot.hears(/(kelly)/gmi, ctx =>{
    ctx.replyWithPhoto(
        {url:"https://img3.gelbooru.com//samples/ca/4b/sample_ca4bd61b35c07de154b7ab216779df2a.jpg"},
        {caption: "flatchest btfo HOHOHOOHOHOHO"}
       
       )
});

bot.hears(/(frankcys)/gmi, ctx =>{
    ctx.replyWithPhoto(
        {url:"https://i.imgur.com/a82u1j9.jpg"},
        {caption: "Esponja para dejarlos zeko zeko"}
       
       )
});

bot.hears([/(joseph)/gmi,/(gioseph)/gmi], ctx =>{
    ctx.replyWithVideo({ source: "./videos/TENGO_UN_POLLoN.134.mp4"})
    .then(ctx.reply("8=====================================D  (i)"));

});

bot.command("/bajar", ctx =>{
    getVideo(ctx)
    .then(data => {
        ctx.reply("subiendo el video...")
        .then(ctx.replyWithVideo({source: data})
        
        .then(fs.unlink(data,()=>{})));
    })
    .catch((error)=>{
        ctx.reply(`Algo paso con error: ${error.stderr}`)
        console.log(error)
    })

});




bot.command("/dolar", ctx => {
    getDollar(ctx.message.text)
        .then(valorUSD => 
            ctx.reply(`epale ${valorUSD}`
        ))
    .catch((error) =>{
        ctx.reply("algo malo paso o se rompio")
        console.error(error)
    });

});

bot.command("/g", ctx => {
    getBooru(ctx.message.text)
        .then(urlewd => ctx.replyWithPhoto(
            {url:urlewd.file_url},
            {caption: `Source: ${urlewd.source != null ?  urlewd.source: "No hay el mio."}`}
           ))
        .catch((error)=>{
            ctx.reply("La cagaste en uno de los tags");
            console.error(error);
        });
                 

});

bot.command("/culo",ctx=>{
    console.log(ctx.message)
})

console.log("Launch.")
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));