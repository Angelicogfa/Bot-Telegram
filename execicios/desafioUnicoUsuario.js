const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(ctx => {
    const from = ctx.update.message.from;
    console.log(from);
    if (from.id === 123) {
        ctx.reply(`Bem vindo meu mestre ${from.first_name}!`)
    } else {
        ctx.reply(`Sinto muito ${from.first_name}, mas só falo com meu mestre!`)
    }
});


bot.startPolling();