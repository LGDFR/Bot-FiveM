const {Client, Intents} = require('discord.js');
const {ip , port , token, avatar, username} = require('./config.json')
const request = require('request');
const client = new Client({intents:[Intents.FLAGS.GUILDS]});
client.on('ready',()=>{
    /**Changement du nom d'utilisateur */
    client.user.setUsername(`${username}`);

    /** Ajout d'un Avatar */
    client.user.setAvatar(`${avatar}`);
    setInterval(()=>{
         request({url:`http://${ip}:${port}/dynamic.json`,timeout:60,json:true},function(error,response,body){
    if(response === undefined){
        
        client.user.setPresence({ activities: [{ name: '0 Joueurs' }], status: 'idle' });
    }else{
        client.user.setPresence({ activities: [{ name: `${body['clients']} Joueurs` }], status: 'online' });
    }
})


    },300000)
    console.log(`${client.user.tag} est en ligne`)
})

client.login(token)

