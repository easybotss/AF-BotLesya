const { VK } = require('vk-io');
const config = require('./config.json');

const VK_API_KEY = '' // Токен от вашей страницы, получить его можно на сайте https://vkhost.github.io
const ChatId = 1 // Заменить на ID своей беседы, узнать его можно после запуска этого кода, написав в беседе "/chatid"

const APP = new VK({
    token: VK_API_KEY
})

APP.updates.on('message_new', async (context, next) => {
    let text = context.text
    if(context.isChat && context.text == '/chatid') return context.send(context.chatId)
    if(context.senderId == -158861435 && config.status == false && /(начал клановую войну)/.test(text)) {
        config.status = true;
        require("fs").writeFileSync('./config.json', JSON.stringify(config, null, "\t"))

        return context.send(`бой`, {chat_id: ChatId})
    }

    if(context.senderId == -158861435 && config.status == false && /(\[КЛАНОВАЯ ВОЙНА\])/.test(text)) {
        config.status = false;
        require("fs").writeFileSync('./config.json', JSON.stringify(config, null, "\t"))
    }

    switch(true) {
        case (context.senderId == -158861435 && config.status == true && context.chatId == ChatId):
            if (/питомцы победили/.test(text)) {
                config.win += 1;
                config.fights += 1;

                require("fs").writeFileSync('./config.json', JSON.stringify(config, null, "\t"))
                return context.send(`бой`)
            } else 
            if(/питомцы проиграли/.test(text)) {
                config.lose += 1;
                config.fights += 1;

                require("fs").writeFileSync('./config.json', JSON.stringify(config, null, "\t"))
                return context.send(`бой`)
            }
    }
    await next();
})

APP.updates.on('message_new', COMMAND.middleware)
console.log(`Скрипт запущшен.`)

APP.updates.startPolling();