const Discord = require('discord.js')

exports.run = (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    const nonePlaying = new Discord.RichEmbed()
        .setColor(0xde2e43)
        .setTitle(':no_entry: No Music Playing')
        .setDescription('There currently isn\'t any music playing in this guild!')

    if (!fetched) return message.channel.send(nonePlaying)

    const noChannel = new Discord.RichEmbed()
        .setColor(0xde2e43)
        .setTitle(':no_entry: Wrong Channel')
        .setDescription('You must be in the same channel as the bot to skip a song.')

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(noChannel)

    const paused = new Discord.RichEmbed()
        .setColor(0xde2e43)
        .setTitle(':no_entry: Error')
        .setDescription('This music is already paused.')

    if (fetched.dispatcher.paused) return message.channel.send(paused)

    fetched.dispatcher.pause();

    const pause = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':pause_button: Paused')
        .setDescription(`Successfully paused ${fetched.queue[0].songTitle}`)

    if (fetched.dispatcher.paused) return message.channel.send(pause)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'pause',
    description: 'Pauses the discord bot in the voice channel.',
    usage: 'pause'
};
