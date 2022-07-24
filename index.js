const dotenv = require('dotenv')
const { Bot } = require('grammy');

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);

bot.use((ctx, next) => {
    ctx.state = {};
    return next();
})

const middlewareMatchToSplit = function (ctx, next){
    if(!ctx.match){
        return ctx.reply("Please enter a number")
    }
    ctx.state.arguments = ctx.match.split(' ');
    const validateNumbers = ctx.state.arguments.some((elem) => {
        return Number.isNaN(+(elem))
    })

    if(validateNumbers){
        return ctx.reply("Incorrect number entered")
    }
        return next()
}

bot.command("dimagay", (ctx)=> ctx.reply("WHY ARE YOU GAy"));
bot.command("start", (ctx) => ctx.reply("welcome! "));
bot.command("stop", (ctx) => ctx.reply("Okay. I`m will sleep"));
bot.command("add",middlewareMatchToSplit, (ctx) => {
    const result = ctx.state.arguments.reduce((previousValue, currentValue) => {
        return +previousValue + +currentValue
    })
    return ctx.reply(result);
})

bot.command("subtract",middlewareMatchToSplit, (ctx) => {
    const result = ctx.state.arguments.reduce((previousValue, currentValue) => {
        return +previousValue - +currentValue
    })
    return ctx.reply(result);
})


bot.command("multiply",middlewareMatchToSplit,  (ctx) => {
    const result = ctx.state.arguments.reduce((previousValue, currentValue) => {
        return +previousValue * +currentValue
    })
    return ctx.reply(result);
})

bot.hears(/^\/.*/, (ctx) => {
    ctx.reply("Please use one of the following commands: \n/add\n/subtract\n/multiply\n/start\n/stop ")
});


bot.hears("Hello", (ctx) => {
    ctx.reply("Hello", {
        reply_to_message_id: ctx.msg.message_id,
    })
})

bot.start();
