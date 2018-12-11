const Discord = require('discord.js');
const ascii = require('ascii-art')

exports.run = (client, message, args, ops) => {
    
        const tooLong = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle('Error: Too long')
        .setDescription('Please shorten the message.')
    
    ascii.font(args.join(' '), 'Doom', function(rendered) {
        
        rendered = rendered.trimRight();
        
        if (rendered.length > 2000) return message.channel.send(tooLong)
        
        message.channel.send(rendered, {
            code: 'md'
        });
    });
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};

exports.help = {
    name: 'ascii',
    description: 'Sends text in ascii format',
    usage: 'ascii <text>'
};
