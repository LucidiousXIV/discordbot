const Discord = require('discord.js')
exports.run = (client, message, args, ops) => {
    
    client.guilds.map(g => g.name)
    
    const embed = new Discord.RichEmbed()
    .setColor(0x36393f)
    .setTitle('Name - ID - Member Count - Verification Level - Channel Amount')
    .setDescription(client.guilds.map(g => `${g.name} - ${g.id} - ${g.memberCount} - Verification Level: ${g.verificationLevel} - Text Channels: ${g.channels.filter(message => message.type === 'text').size} - Voice Channels: ${g.channels.filter(message => message.type === 'voice').size}\n`))
    
    message.channel.send(embed)
    
}
