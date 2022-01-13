const mshHandler = require('./messageHandler')
const tmi = require('tmi.js')

const ops = {
    identity: {
        username: 'Nadari',
        password: 'oauth:vekg5c1cvjt8yxmkrcyial5gs2sc2f'
    },
    channels: [
        'Carivien',
        'Nadari'
    ]
}

const client = new tmi.client(ops)

client.on('message', (target, context, msg, self) => {

    mshHandler.messageHandler(client, target, context, msg, self)

})
client.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`)
})


client.connect()