const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    
 //   const embed = Discord.RichEmbed()
   // .setDescription(':ping_pong:Pong! `' + `${msg.createdTimestamp - message.createdTimestamp}` + 'ms`' + ' API Latency `' + `${client.ping}` + 'ms`')
    
    const msg = await message.channel.send("Pinging");
    msg.edit({ embed: { 
            color: 0x36393f,
            description: `Pong! (Roundtrip: **${msg.createdTimestamp - message.createdTimestamp}ms** | One-way: **${~~client.ping}ms**)`
    }})
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'ping',
    description: 'Displays your connection to the server and bot.',
    usage: 'ping'
};
