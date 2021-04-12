const { Telegraf, Context } = require("telegraf")
const getDollar = require("./modulos/dolar");
const getBooru = require("./modulos/gelburu");
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const development = process.env.NODE_ENV;
if (development) {
    require('dotenv').config()
}

const bot = new Telegraf(process.env.TOKENTELEGRAM);

bot.start((ctx)=>{  
    ctx.reply("Epale");
})

// Kuek
bot.hears(/(gabriel)/gmi, ctx =>{
    ctx.replyWithPhoto(
        {url:"https://i2-prod.mirror.co.uk/incoming/article1448101.ece/ALTERNATES/s615b/Skeleton%20in%20Sweden"});

    ctx.reply("lo quiero mucho al pana @Miguel129");
})

bot.hears(/(marico el que lo lea)/gmi, ctx => {
    ctx.reply(`mas marico es el pana @${ctx.from.username}`);
});

bot.hears(/(miguel)/gmi, ctx => {
    ctx.replyWithVideo({ source: "./videos/el pana Miguel.mp4"});
    
});



bot.hears("megumi", ctx => {
    ctx.replyWithVideo(
        { source: "./videos/megumi.mp4"},
        {caption: "El pana @GabrielReinoza esta zeko zeko rip"});
});

bot.hears(/(kelly)/gmi, ctx =>{
    ctx.replyWithPhoto(
        {url:"https://img3.gelbooru.com//samples/ca/4b/sample_ca4bd61b35c07de154b7ab216779df2a.jpg"},
        {caption: "flatchest btfo HOHOHOOHOHOHO"}
       
       )
})


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

console.log("Launch.")
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));