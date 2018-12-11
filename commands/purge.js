const Discord = require('discord.js');
const moment = require('moment');
exports.run = (client, message, args, tools) => {
    
            const noperms = new Discord.RichEmbed()
            .setAuthor('❌ | Insufficient Permissions')
            .setDescription('I do not have the correct permissions to run that command.\nNeeded permissions: \`MANAGE_MESSAGES\`')
            .setColor('#de2e43')
            const nopermsUser = new Discord.RichEmbed()
            .setAuthor('❌ | Insufficient Permissions')
            .setDescription('I do not have the correct permissions to run that command.\nNeeded permissions: \`MANAGE_MESSAGES\`')
            .setColor('#de2e43')
            if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send(noperms).catch(console.error);
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(nopermsUser);
            if (isNaN(args[0])) return message.channel.send('**Please supply a valid amount of messages to purge**');
            if (args[0] > 1000) return message.channel.send(':warning: `Please supply a number less than 100`');
            
            message.channel.bulkDelete(args[0]);
            const embed = new Discord.RichEmbed()            
            .setAuthor('Clean up')
            .setDescription(`Purged **${args[0]}** messages :white_check_mark:`)
            .setFooter(`Staff: ${message.author.tag}`)
            .setTimestamp()
            .setColor(0x36393f);
            message.channel.send(embed).then(i=>{i.delete(10000)})

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};

exports.help = {
    name: 'purge',
    description: 'Purges X amount of messages from a given channel.',
    usage: 'purge <number>'
};
