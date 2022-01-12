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
    
    const commandName = msg.trim()

    console.log(target)
    console.log(context)
    console.log(msg)
    console.log(self)

    if (msg.toLowerCase().includes('hurensohn'))
        sendBotMsg(target, `@${context.username} Geh nicht auf Mutter`)
    
    if (commandName === '!test')
        sendBotMsg(target, 'Hi Ich bin ein Bot lmao')

    if (commandName === '!adrian')
        sendBotMsg(target, 'Adrian ist grade schwer beschäftigt mit wichter Arbeit. 💻')

})
client.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`)
})

function sendBotMsg(target, msg) {
    client.say(target, `[${msg}]`)
}


client.connect()