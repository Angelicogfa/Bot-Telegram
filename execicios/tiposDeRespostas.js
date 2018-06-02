const env = require('../.env');
const Telegraf = require('telegraf');
const bot = new Telegraf(env.token);

bot.start(async ctx => {
    await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}! 😂`);
    await ctx.replyWithHTML(`Destacando mensagem <b>HTML</b>
                <i>de várias</i> <code>formas</code> <pre>possiveis</pre>
                <a href="http://www.google.com.br">link</a>`);
    await ctx.replyWithMarkdown(`Destacando mensagem *Markdown*`);
    await ctx.replyWithPhoto({source: `${__dirname}/gato.jpeg`});
    await ctx.replyWithPhoto('http://files.cod3r.com.br/curso-bot/gato1.jpg', {caption: 'Olha o estilo !!!'});
    await ctx.replyWithPhoto({ url: 'http://files.cod3r.com.br/curso-bot/gato2.jpg'});
    await ctx.replyWithLocation(29.9773008, 31.1303068);
    await ctx.replyWithVideo('http://files.cod3r.com.br/curso-bot/cod3r-end.m4v');
});

bot.startPolling();