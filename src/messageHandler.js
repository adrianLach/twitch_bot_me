const https = require('https')

exports.messageHandler = (client, target, context, msg, self) => {

    const commandName = msg.trim()

    console.log(target)
    console.log(context)
    console.log(msg)
    console.log(self)

    if (msg.toLowerCase().includes('hurensohn'))
        sendBotMsg(client, target, `@${context.username} Geh nicht auf Mutter`)
    
    if (commandName === '!test')
        sendBotMsg(client, target, 'Hi Ich bin ein Bot lmao')

    if (commandName === '!adrian')
        sendBotMsg(client, target, 'Adrian ist grade schwer beschäftigt mit wichter Arbeit. 💻')
        
    if (commandName === '!spaß')
        sendBotMsg(client, target, 'Nein, wir haben hier keinen Spaß!')
    
    if (commandName === '!rank') {
        if(target === '#nadari')
            getRanked('Nadari', client, target)
        if(target === '#carivien')
            getRanked('xinterrupted', client, target)
    }
}

function sendBotMsg(client, target, msg) {
    client.say(target, `[${msg}]`)
}

function getRanked(lolName, client, target) {

    const options = {
        hostname: 'euw1.api.riotgames.com',
        port: '443',
        path: `/lol/summoner/v4/summoners/by-name/${lolName}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Riot-Token': 'RGAPI-b2ef75b8-ead2-4252-8f58-dbfbdd1b970c'
        }
    } 

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        
        let data = ''
        res.on('data', d => {
            data += d
        })
      
        res.on('end', () => {
            console.log(JSON.parse(data));
            const id = JSON.parse(data).id

          const options2 = {
              hostname: 'euw1.api.riotgames.com',
              port: '443',
              path: `/lol/league/v4/entries/by-summoner/${id}`,
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'X-Riot-Token': 'RGAPI-b2ef75b8-ead2-4252-8f58-dbfbdd1b970c'
              }
          }

          const req2 = https.request(options2, res => {
        
            let data2 = ''
            res.on('data', d => {
                data2 += d
            })

              res.on('end', () => {
                console.log(JSON.parse(data2));
                const _data = JSON.parse(data2)
                client.say(target, `[${_data[0].summonerName}: ${_data[0].tier} ${_data[0].rank} - ${_data[0].leaguePoints} LP - ${_data[0].wins}/${_data[0].losses} W/L]`)
              })
          })
      
          req2.on('error', error => {
              console.error(error)
          })
            
          req2.end()

        })
    })
      
    req.on('error', error => {
        console.error(error)
    })
      
    req.end()
}

