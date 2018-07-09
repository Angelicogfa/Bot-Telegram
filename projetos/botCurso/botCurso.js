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

bot.hears('Posso mesmo automatizar tarefas ?', async ctx => {
    await ctx.reply('Claro que sim\n Quer uma palhinha ?', botoes);
})

bot.hears('Como comprar o curso ?', ctx => {
    ctx.replyWithMarkdown('Que bom! [link](https://www.cod3r.com.br/)', tecladoOpcoes);
})

bot.action('n', ctx => {
    ctx.reply('OK, fica para a próxima...', tecladoOpcoes);
});

bot.action('s', async ctx => {
    await ctx.reply('Que legal, tente me enviar sua localização, ou escrever uma mensagem qualquer...', localizacao);
});

bot.hears(/mensagem qualquer/i, async ctx => {
    await ctx.replyWithMarkdown('Essa piada é velha, mande outra...', tecladoOpcoes);
});

bot.on('text', async ctx => {
    let msg = ctx.message.text;
    msg = msg.split('').reverse().join('');
    await ctx.reply(`A sua mensagem, ao contrario é ${msg}`);
    await ctx.reply('Eu consigo ler o que você escreve e processar sua mensaagem', tecladoOpcoes);
});

bot.on('location', async ctx => {
    try {
        const url = 'http://api.openweathermap.org/data/2.5/weather';
        const { latitude: lat, longitude: lon } = ctx.message.location;
        //console.log(lat, lon);

        const res = await axios.get(`${url}?lat=${lat}&lon=${lon}&APPID=5b6417eb324d299f891b65c2b93f0318&units=metric`);
        await ctx.reply(`Você está em ${res.data.name}`);
        await ctx.reply(`A temperatura por ai está em ${res.data.main.temp}ºC`, tecladoOpcoes);
    } catch (e) {
        ctx.replyWithMarkdown(`*Opss...* alguma coisa deu errado..Você está no planeta terra :P`, tecladoOpcoes);
    }
});

bot.startPolling();