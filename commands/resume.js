const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    const nonePlaying = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':no_entry: No Music Playing')
        .setDescription('There currently isn\'t any music playing in this guild!');

    if (!fetched) return message.channel.send(nonePlaying);

    const noChannel = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':no_entry: Wrong Channel')
        .setDescription('You must be in the same channel as the bot to skip a song.');

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(noChannel);

    const paused = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':no_entry: Error')
        .setDescription('This music isn\'t paused.');

    if (!fetched.dispatcher.paused) return message.channel.send(paused);

    fetched.dispatcher.resume();

    const resume = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':play_pause: Resumed')
        .setDescription(`Successfully resumed ${fetched.queue[0].songTitle}`)

    message.channel.send(resume)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'resume',
    description: 'Unpauses the bot in the music channel.',
    usage: 'resume'
};
