const env = require('../../.env');
const Telegram = require('telegraf/telegram');
const axios = require('axios');
const Markup = require('telegraf/markup');

const enviarMensagem = mensagem => {
    axios.get(`${env.apiUrl}/sendMessage?chat_id=${env.userID}&text=${encodeURI(mensagem)}`)
        .catch(e => console.log(e));
}

setInterval(() => {
    enviarMensagem('Enviando mensagem assincrona');
}, 3000);

const teclado = Markup.keyboard([
    ['OK', 'Cancelar']
]).resize().oneTime().extra();

const telegram = new Telegram(env.token);
telegram.sendMessage(env.userID, 'Essa é uma mensagem com teclado', teclado);