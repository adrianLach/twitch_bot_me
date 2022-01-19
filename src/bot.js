const mshHandler = require('./messageHandler')
const tmi = require('tmi.js')

const ops = {
    identity: {
        username: 'Nadari',
        password: ''
    },
    channels: [
        'Carivien',
        'Nadari'
    ]
}

const client = new tmi.client(ops)

client.on('message', (target, context, msg, self) => {

    try {
        mshHandler.messageHandler(client, target, context, msg, self)
    } catch (error) {
        client.say(target, '## Upsi.. We got an Error here 🤖 ##')
        console.log(error)
    }
})
client.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`)
})


client.connect()