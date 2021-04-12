require('dotenv').config()
const { Telegraf } = require("telegraf")
const getDollar = require("./modulos/dolar");
const getBooru = require("./modulos/gelburu");
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const development = process.env.NODE_ENV;

const bot = new Telegraf(process.env.TOKENTELEGRAM);

bot.start((ctx)=>{  
    ctx.reply("Epale");
})

// Kuek
bot.hears(["gabriel","Gabriel","GABRIEL"], ctx =>{
    ctx.replyWithPhoto(
        {url:"https://i2-prod.mirror.co.uk/incoming/article1448101.ece/ALTERNATES/s615b/Skeleton%20in%20Sweden"},
        {caption: "El pana @GabrielReinoza esta zeko zeko rip"}
       
       )
})

bot.hears("marico el que lo lea",ctx => {
    ctx.reply("mas marico es el pana "+ ctx.get);
});

bot.hears("gabriel", ctx => {
    ctx.reply("ese pana esta como mongasama pero zeko zeko");
});

bot.hears("megumi", ctx => {
    ctx.replyWithVideo({ source: "./videos/megumi.mp4"});
});

bot.command("/dolar", ctx => {
    getDollar(ctx.message.text)
        .then(valorUSD => 
            ctx.reply(`epale ${valorUSD}`
        ))
    .catch(() =>{
        ctx.reply("algo malo paso o se rompio")

    });

});

bot.command("/g", ctx => {
    getBooru(ctx.message.text)
        .then(urlewd => ctx.replyWithPhoto(
            {url:urlewd.file_url},
            {caption: `Source: ${urlewd.source != null ?  urlewd.source: "No hay el mio."}`}
           ))
        .catch(()=>{
            ctx.reply("La cagaste en uno de los tags");
        });
                 

});


console.log("Launch.")
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));