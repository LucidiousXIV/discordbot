const Discord = require('discord.js');

exports.run = async (client, message, args, tools) => {
    
    const noRole = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle('Error: No Role')
        .setDescription('You need the Administrator role to run this command.')
    
    const noPerm = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':no_entry: Error: Insufficient Permissions')
        .setDescription('Required Permission: \`ADMINISTRATOR\`')
    
    const noArgs = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':no_entry: Error: No Input')
        .setDescription('You must input a question or a statement to make a poll.')
    
    if (!message.member.roles.find(r => r.name === 'Developer')) return message.channel.send(noRole)
   // if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noPerm)
   if (!args[0]) return message.channel.send(noArgs)
   
   const embed = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setFooter('React to Vote!')
        .setDescription(args.join(' '))
        .setTitle(`Poll created by ${message.author.username}`)
        
    let msg = await message.channel.send(embed);
    await msg.react('✅')
    await msg.react('⛔')
    
    message.delete({timeout: 1000});
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'poll',
    description: 'Create a poll with reaction based answers.',
    usage: 'poll <question>'
};
