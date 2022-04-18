const {Client, Intents,WebhookClient} = require('discord.js')
const request = require('request')
var argv = require('minimist')(process.argv.slice(2));
const client = new Client({intents:[Intents.FLAGS.GUILDS]})
const hook = new WebhookClient({url:`${argv['webhook']}`})
client.on('ready',()=>{
    setInterval(()=>{
         request({url:`http://${argv['ip_port']}/dynamic.json`,timeout:60,json:true},function(error,response,body){
    if(response === undefined){
        client.user.setPresence({ activities: [{ name: '0 Joueurs' }], status: 'idle' });
    }else{
        client.user.setPresence({ activities: [{ name: `${body['clients']} Joueurs` }], status: 'online' });
    }
})


    },300000)
    console.log('Bot en ligne.')
hook.send(`Le bot discord ${client.user.tag} est en ligne`)
})

client.login(argv['token'])

