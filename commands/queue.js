const Discord = require('discord.js')

exports.run = async (client, message, args, ops) => {
    
    let fetched = ops.active.get(message.guild.id);
    const nonePlaying = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':no_entry: No Music Playing')
        .setDescription('There currently isn\'t any music playing in this guild!')
    if (!fetched) return message.channel.send(nonePlaying);
    
    let queue = fetched.queue;
    let nowPlaying = queue[0];
    var resp = `**Now Playing:**\n${nowPlaying.songTitle}\n**Requested By:**\n${nowPlaying.requester}\n\n**Queue**\n`

    
    for (var i = 1; i < queue.length; i++) {
        resp += `${i}. **${queue[i].songTitle}**\n**Requested By:** ${queue[i].requester}\n`
    }
    const embed = new Discord.RichEmbed()
        .setDescription(resp)
        .setColor(0x36393f)
    message.channel.send(embed)
    
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'queue',
    description: 'Show\'s the current music queue.',
    usage: 'queue'
};

/*

let resp = ({embed: {
        color: 3447003,
        description: `**Now Playing:**\n${nowPlaying.songTitle}\n**Requested By:**\n${nowPlaying.requester}\n\n**Queue**\n${i}. **${queue[i].songTitle}**\n**Requested By:**\n${queue[i].requester}\n`
        description: `${i}. **${queue[i].songTitle}**\n**Requested By:**\n${queue[i].requester}\n`
}});

*/

/*
const Discord = require('discord.js')

exports.run = async (client, message, args, ops) => {
    
    let fetched = ops.active.get(message.guild.id);
    
    if (!fetched) return message.channel.send('There currently isn\'t any music playing in this guild!');
    
    let queue = fetched.queue;
    let nowPlaying = queue[0];
    let resp = `\`\`\`**Now Playing:**\n${nowPlaying.songTitle}\n**Requested By:**\n${nowPlaying.requester}\n\`\`\``
    
    for (var i = 1; i < queue.length; i++) {
        resp += `${i}. **${queue[i].songTitle}**\n**Requested By:**\n${queue[i].requester}\n`
    }
    message.channel.send(resp)
}
*/
