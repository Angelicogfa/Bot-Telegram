const env = require('../../.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const axios = require('axios');
const bot = new Telegraf(env.token);

const tecladoOpcoes = Markup.keyboard([
    ['O que são bots?', 'O que verei no curso ?'],
    ['Posso mesmo automatizar tarefas ?'],
    ['Como comprar o curso ?']
]).resize().extra();

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 's'),
    Markup.callbackButton('Não', 'n')
]), { columns: 2 });

const localizacao = Markup.keyboard([
    Markup.locationRequestButton('Clique aqui para enviar a sua localização')
]).resize().oneTime().extra();

bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name;
    await ctx.replyWithMarkdown(`*Olá, ${nome}!*\nEu sou o ChatBot do curso`);
    await ctx.replyWithPhoto('http://files.cod3r.com.br/curso-bot/bot.png');
    await ctx.replyWithMarkdown(`_Posso te ajudar em algo ?_`, tecladoOpcoes);
});

bot.hears('O que são bots?', ctx => {
    ctx.replyWithMarkdown('Bots são blá, blá, blá\n _Algo mais ?_', tecladoOpcoes);
})

bot.hears('O que verei no curso ?', async ctx => {
    await ctx.replyWithMarkdown('No *curso*... tamém vamos criar *3 projetos:*');
    await ctx.reply('1. Bot que vai gerar gerenciar lista de compras');
    await ctx.reply('2. Um bot que vai permitir cadastrar seus eventos');
    await ctx.reply('3. E você verá como eu fui feito, isso mesmo.');
    await ctx.replyWithMarkdown('\n\n _Algo mais?_', tecladoOpcoes);
})

bot.hears('Posso mesmo automatizar tarefas ?', ctx => {
    
})

bot.hears('Como comprar o curso ?', ctx => {
    
})

bot.startPolling();