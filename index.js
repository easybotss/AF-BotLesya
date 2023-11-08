const { VK } = require('vk-io');
const { HearManager } = require ('@vk-io/hear')
const COMMAND = new HearManager()
const config = require('./config.json');
const APP = new VK({
    token: 'vk1.a.dCUeMKTv2MuxDHEi-PMUE1ZYPABbvu7VSNajuQSzLxDSRx6fYX6zbTlBR5nCocglWTNy_Gf960kLqPcg07uRoHyKpLFB7GnoRLTS2Fwjqlg5MpbPal3ZNIXqQEHabgFgITZJFFog_62v6Boc0yI6xsodFm_L6JCeHmx0Vix7RwmPXuEMS7RB_2gLhQy44xSfpybRTVJpusSMakccmhMnyQ'
})



APP.updates.on('message_new', async (context, next) => {
    let text = context.text
    switch(true) {
        case (context.senderId == -158861435 && config.status == true && context.chatId == 698):
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


COMMAND.hear(/^(?:\/)(.*)/i, async(context) => {
    if (context.senderId == 347241116) {
        try {
            const result = eval(context.$match[1]);

            if (typeof(result) === 'string') {
                return context.send(`Type: string\nResult: ${result}`);
            } else if (typeof(result) === 'number') {
                return context.send(`Type: number\nResult: ${result}`);
            } else if (typeof(result) === 'boolean') {
                return context.send(`Type: boolean\nResult: ${result}`);
            } else {
                return context.send(`${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
            }
        } catch (e) {
            console.error(e);
            return context.send(`Error:\n${e.toString()}`);
        }
    }
})

APP.updates.startPolling();