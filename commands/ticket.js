const Discord = require('discord.js');
const moment = require('moment');

const cooldown = new Set();
exports.run = async(client, message, ops) => {
    let args = message.content.split(' ').slice(1).join(' ');
    message.delete();
    if (cooldown.has(message.author.id && message.guild.id)) {
        return message.channel.send('**[COOLDOWN]** Sending tickets has **5 Minutes** Cooldown!');
    }
    if (args.length < 1) {
        return message.channel.send(`You must give me something to report first ${message.author}`);
    }
    cooldown.add(message.author.id && message.guild.id);
    setTimeout(() => {
        cooldown.delete(message.author.id && message.guild.id);
    }, 300000);
    let guild = message.guild;
    const cnl = client.channels.get('463965877910372383');
    message.channel.send(`Hey, ${message.author}, we got your report! We will reply soon as possible! Here is the full ticket:`);
    const embed2 = new Discord.RichEmbed()
        .setAuthor(`Ticket from ${message.author.tag}`, message.author.displayAvatarURL)
        .addField('Ticket:', `**Tickets's Author:** ${message.author.tag}\n**Server:** ${guild.name}\n**Full ticket:** ${args}`)
        .setThumbnail(message.author.displayAvatarURL)
        .setTimestamp()
        .setColor(0x36393f);
    message.channel.send({ embed: embed2 });
    const embed = new Discord.RichEmbed()
        .setAuthor(`Ticket from ${message.author.tag}`, message.author.displayAvatarURL)
        .addField('Ticket:', `**Report's Author:** ${message.author.tag}\n**Server:** ${guild.name}\n**Full report:** ${args}`)
        .setThumbnail(message.author.displayAvatarURL)
        .setTimestamp()
        .setColor(0x36393f);
    cnl.send({ embed })
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'ticket',
    description: 'Sends a ticket to the bot owner regarding any issues.',
    usage: 'ticket <issue>'
};
